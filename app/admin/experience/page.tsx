'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, ArrowLeft, Loader2, X } from 'lucide-react'
import Link from 'next/link'

interface Experience {
    id: number
    role: string
    company: string
    companyUrl: string | null
    period: string
    description: string
}

export default function ManageExperience() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        companyUrl: '',
        period: '',
        description: ''
    })

    useEffect(() => {
        fetchExperiences()
    }, [])

    async function fetchExperiences() {
        try {
            const res = await fetch('/api/experience')
            const data = await res.json()
            setExperiences(data)
        } catch (error) {
            console.error('Failed to fetch experiences')
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        try {
            const url = editingId ? `/api/experience/${editingId}` : '/api/experience'
            const method = editingId ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setFormData({ role: '', company: '', companyUrl: '', period: '', description: '' })
                setEditingId(null)
                fetchExperiences()
            }
        } catch (error) {
            console.error('Failed to save experience')
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this experience?')) return
        try {
            await fetch(`/api/experience/${id}`, { method: 'DELETE' })
            setExperiences(experiences.filter(exp => exp.id !== id))
        } catch (error) {
            console.error('Failed to delete experience')
        }
    }

    function handleEdit(exp: Experience) {
        setEditingId(exp.id)
        setFormData({
            role: exp.role,
            company: exp.company,
            companyUrl: exp.companyUrl || '',
            period: exp.period,
            description: exp.description
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Terminal
                </Link>

                <h1 className="text-4xl font-bold mb-8 neon-text">Experience Database</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-panel p-8 mb-12 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {editingId ? <><Edit2 size={20} className="text-blue-400" /> Edit Experience</> : <><Plus size={24} className="text-[var(--primary)]" /> Add New Experience</>}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Role / Position</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                placeholder="e.g. Senior Software Engineer"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Company Name</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                placeholder="e.g. Google"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Company URL (Optional)</label>
                            <input
                                type="url"
                                value={formData.companyUrl}
                                onChange={e => setFormData({ ...formData, companyUrl: e.target.value })}
                                placeholder="https://example.com"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Period</label>
                            <input
                                type="text"
                                value={formData.period}
                                onChange={e => setFormData({ ...formData, period: e.target.value })}
                                placeholder="e.g. Jan 2022 — Present"
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-semibold uppercase tracking-wider">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={4}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary flex-1 justify-center py-4"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : editingId ? <Save size={20} /> : <Plus size={20} />}
                            {editingId ? 'Update Experience' : 'Add Experience'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null)
                                    setFormData({ role: '', company: '', companyUrl: '', period: '', description: '' })
                                }}
                                className="px-6 py-4 rounded-full border border-white/10 hover:bg-white/5 transition flex items-center gap-2"
                            >
                                <X size={20} /> Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* Experience List */}
                {loading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin mx-auto text-[var(--primary)]" size={40} />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {experiences.map(exp => (
                            <div key={exp.id} className="glass-panel p-8 border-l-4 border-l-[var(--secondary)] flex justify-between gap-6 group">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold">{exp.role}</h3>
                                        <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">{exp.period}</span>
                                    </div>
                                    <p className="text-[var(--primary)] font-semibold mb-4">{exp.company}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{exp.description}</p>
                                </div>
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(exp)}
                                        className="p-3 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(exp.id)}
                                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
