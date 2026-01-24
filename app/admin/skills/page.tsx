'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Skill {
    id: number
    name: string
    level: number
}

export default function ManageSkills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [newSkill, setNewSkill] = useState({ name: '', level: 80 })

    useEffect(() => {
        fetchSkills()
    }, [])

    async function fetchSkills() {
        try {
            const res = await fetch('/api/skills')
            const data = await res.json()
            setSkills(data)
        } catch (error) {
            console.error('Failed to fetch skills')
        } finally {
            setLoading(false)
        }
    }

    async function handleAddSkill(e: React.FormEvent) {
        e.preventDefault()
        if (!newSkill.name) return
        setSaving(true)
        try {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSkill)
            })
            if (res.ok) {
                setNewSkill({ name: '', level: 80 })
                fetchSkills()
            }
        } catch (error) {
            console.error('Failed to add skill')
        } finally {
            setSaving(false)
        }
    }

    async function handleDeleteSkill(id: number) {
        if (!confirm('Are you sure you want to delete this skill?')) return
        try {
            await fetch(`/api/skills/${id}`, { method: 'DELETE' })
            setSkills(skills.filter(s => s.id !== id))
        } catch (error) {
            console.error('Failed to delete skill')
        }
    }

    async function handleUpdateLevel(id: number, level: number) {
        try {
            await fetch(`/api/skills/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level })
            })
            setSkills(skills.map(s => s.id === id ? { ...s, level } : s))
        } catch (error) {
            console.error('Failed to update level')
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Terminal
                </Link>

                <h1 className="text-4xl font-bold mb-8 neon-text">Skills Matrix</h1>

                {/* Add New Skill */}
                <form onSubmit={handleAddSkill} className="glass-panel p-6 mb-12 flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm text-gray-400 mb-2">Skill Name</label>
                        <input
                            type="text"
                            value={newSkill.name}
                            onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                            placeholder="e.g. Cypress Automation"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors"
                            required
                        />
                    </div>
                    <div className="w-32">
                        <label className="block text-sm text-gray-400 mb-2">Level (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={newSkill.level}
                            onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />} Add Skill
                    </button>
                </form>

                {/* Skills List */}
                {loading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin mx-auto text-[var(--primary)]" size={40} />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {skills.map(skill => (
                            <div key={skill.id} className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={skill.level}
                                            onChange={e => handleUpdateLevel(skill.id, parseInt(e.target.value))}
                                            className="flex-1 accent-[var(--primary)]"
                                        />
                                        <span className="text-sm font-mono w-10">{skill.level}%</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
