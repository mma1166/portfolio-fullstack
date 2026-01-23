'use client'
import { useState, useEffect } from 'react'
import { ArrowLeft, User, Upload } from 'lucide-react'
import Link from 'next/link'

export default function ProfileAdmin() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const res = await fetch('/api/profile')
        if (res.ok) {
            const data = await res.json()
            setImageUrl(data?.imageUrl)
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        const res = await fetch('/api/profile', {
            method: 'POST',
            body: formData
        })

        if (res.ok) {
            const data = await res.json()
            setImageUrl(data.imageUrl)
            alert('Profile picture updated!')
        }
        setSaving(false)
    }

    if (loading) return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-black text-white p-8 animate-in fade-in duration-500">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition"><ArrowLeft size={20} /> Back</Link>
                    <h1 className="text-3xl font-bold">Profile Identity</h1>
                </div>

                <div className="glass-panel p-8 text-center">
                    <div className="relative inline-block mb-8">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Profile" className="w-48 h-48 rounded-full object-cover border-4 border-[var(--primary)] shadow-[0_0_30px_rgba(0,243,255,0.2)]" />
                        ) : (
                            <div className="w-48 h-48 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center">
                                <User size={80} className="text-white/20" />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center">
                            <label className="block text-sm text-gray-400 mb-4 cursor-pointer hover:text-white transition">
                                <div className="btn-primary inline-flex items-center gap-2">
                                    <Upload size={18} /> Choose New Image
                                </div>
                                <input name="image" type="file" required className="hidden" accept="image/*" />
                            </label>
                        </div>

                        <button type="submit" disabled={saving} className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50">
                            {saving ? 'UPLOADING...' : 'SAVE CHANGES'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
