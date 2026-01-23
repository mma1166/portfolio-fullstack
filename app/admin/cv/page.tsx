'use client'
import { useState, useEffect } from 'react'
import { Check, Trash2, Upload, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CV {
    id: number
    filename: string
    url: string
    isActive: boolean
    createdAt: string
}

export default function CVAdmin() {
    const [cvs, setCvs] = useState<CV[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCvs()
    }, [])

    const fetchCvs = async () => {
        const res = await fetch('/api/cv')
        if (res.ok) setCvs(await res.json())
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return
        setLoading(true)
        const formData = new FormData()
        formData.append('file', e.target.files[0])

        await fetch('/api/cv', { method: 'POST', body: formData })
        await fetchCvs()
        setLoading(false)
    }

    const handleSetActive = async (id: number) => {
        await fetch(`/api/cv/${id}`, { method: 'PUT' })
        fetchCvs()
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this CV?')) return
        await fetch(`/api/cv/${id}`, { method: 'DELETE' })
        fetchCvs()
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition"><ArrowLeft size={20} /> Back</Link>
                    <h1 className="text-3xl font-bold">CV Database</h1>
                    <label className={`btn-primary text-sm cursor-pointer ${loading ? 'opacity-50' : ''}`}>
                        {loading ? 'Uploading...' : 'Upload New CV'} <Upload size={18} />
                        <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={loading} />
                    </label>
                </div>

                <div className="space-y-4">
                    {cvs.map((cv) => (
                        <div key={cv.id} className={`glass-panel p-4 flex items-center justify-between ${cv.isActive ? 'border-[var(--primary)] shadow-[0_0_20px_rgba(0,243,255,0.1)]' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${cv.isActive ? 'bg-[var(--primary)] text-black' : 'bg-white/10 text-gray-400'}`}>
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">{cv.filename}</h3>
                                    <a href={cv.url} target="_blank" className="text-xs text-gray-500 hover:underline">View File</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {cv.isActive ? (
                                    <span className="flex items-center gap-2 text-[var(--primary)] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[var(--primary)]/10 rounded-full">
                                        <Check size={14} /> Active
                                    </span>
                                ) : (
                                    <button onClick={() => handleSetActive(cv.id)} className="px-3 py-1 text-xs border border-white/20 rounded-full hover:bg-white/10 transition">
                                        Set Active
                                    </button>
                                )}
                                <button onClick={() => handleDelete(cv.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {cvs.length === 0 && <p className="text-center text-gray-500">No CVs uploaded.</p>}
                </div>
            </div>
        </div>
    )
}
