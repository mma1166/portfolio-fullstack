import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github, Globe, Calendar, Tag } from 'lucide-react'

export const revalidate = 0

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
        notFound()
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId }
    })

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[var(--background)] text-white py-24 px-4">
            <div className="container max-w-4xl">
                <Link 
                    href="/#projects" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary)] transition-colors mb-12 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>

                <div className="glass-panel p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Tag size={12} /> Project Case Study
                            </span>
                            <span className="text-gray-500 text-sm flex items-center gap-1.5">
                                <Calendar size={14} /> {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                            {project.title}
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-12">
                                {project.imageUrl && (
                                    <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-12 group">
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <span className="w-6 h-[2px] bg-[var(--primary)]"></span> Overview
                                        </h2>
                                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <span className="w-6 h-[2px] bg-[var(--secondary)]"></span> Tech Stack
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.split(',').map((tech, i) => (
                                                <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-[var(--primary)]/50 transition-colors">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {project.link && (
                                        <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
                                            <a 
                                                href={project.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn-primary"
                                            >
                                                {project.linkType === 'live' ? (
                                                    <>Visit Live Site <Globe size={18} /></>
                                                ) : (
                                                    <>View Source Code <Github size={18} /></>
                                                )}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
