'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, ArrowLeft, Edit2 } from 'lucide-react'
import Link from 'next/link'

interface Project {
    id: number
    title: string
    description: string
    techStack: string
    imageUrl: string
    link: string
    linkType: string
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const res = await fetch('/api/projects')
        if (res.ok) {
            const data = await res.json()
            setProjects(data)
        }
        setLoading(false)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return
        await fetch(`/api/projects/${id}`, { method: 'DELETE' })
        fetchProjects()
    }

    const handleEdit = (project: Project) => {
        setEditingProject(project)
        setIsAdding(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        if (editingProject) {
            formData.append('currentImageUrl', editingProject.imageUrl || '')
            const res = await fetch(`/api/projects/${editingProject.id}`, {
                method: 'PUT',
                body: formData
            })
            if (res.ok) {
                setEditingProject(null)
                setIsAdding(false)
                fetchProjects()
            }
        } else {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                setIsAdding(false)
                fetchProjects()
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition"><ArrowLeft size={20} /> Back</Link>
                    <h1 className="text-3xl font-bold">Manage Projects</h1>
                    <button onClick={() => {
                        setIsAdding(!isAdding)
                        if (isAdding) setEditingProject(null)
                    }} className="btn-primary text-sm">
                        {isAdding ? 'Cancel' : 'Add Project'} <Plus size={18} />
                    </button>
                </div>

                {isAdding && (
                    <form key={editingProject?.id || 'new'} onSubmit={handleSubmit} className="glass-panel p-6 mb-8 animate-in slide-in-from-top-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input name="title" defaultValue={editingProject?.title} placeholder="Project Title" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none" />
                            <input name="link" defaultValue={editingProject?.link || ''} placeholder="Project Link (Optional)" className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input name="techStack" defaultValue={editingProject?.techStack} placeholder="Tech Stack (comma separated)" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none" />
                            <select name="linkType" defaultValue={editingProject?.linkType || 'github'} className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none text-gray-400">
                                <option value="github">GitHub Link</option>
                                <option value="live">Live Site Link</option>
                            </select>
                        </div>
                        <textarea name="description" defaultValue={editingProject?.description} placeholder="Description" required className="w-full p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none mb-4" rows={3}></textarea>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">Project Image {editingProject && '(leave blank to keep current)'}</label>
                            <input name="image" type="file" required={!editingProject} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                            {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <div key={p.id} className="glass-panel overflow-hidden group">
                            <div className="h-48 bg-gray-900 relative">
                                {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(p)} className="p-2 bg-blue-500/80 hover:bg-blue-500 rounded-full text-white">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg truncate">{p.title}</h3>
                                <p className="text-gray-400 text-sm line-clamp-2">{p.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
