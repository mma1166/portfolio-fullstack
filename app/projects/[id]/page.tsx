import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Cpu, Globe, Rocket, Terminal } from 'lucide-react'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await prisma.project.findUnique({
        where: { id: parseInt(id) }
    })

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-black text-white relative">
            {/* Background Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-5 pointer-events-none blur-3xl"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--secondary)_0%,_transparent_50%)] opacity-5 pointer-events-none blur-3xl"></div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Back Button */}
                <Link href="/#projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Highlights
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Image Card */}
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <div className="glass-panel p-2 rounded-3xl border border-white/10 group shadow-2xl overflow-hidden aspect-video">
                            {project.imageUrl ? (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-2xl">
                                    <Terminal size={80} className="text-white/20" />
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex gap-4">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="btn-primary flex-1 justify-center py-4 text-lg"
                                >
                                    {project.linkType === 'live' ? 'Live Demonstration' : 'View Repository'} <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Info Area */}
                    <div className="animate-in fade-in slide-in-from-right duration-700">
                        <div className="mb-8">
                            <h4 className="text-[var(--primary)] font-bold tracking-[0.3em] uppercase mb-4 text-sm flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-[var(--primary)]"></span> Case Study
                            </h4>
                            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                                {project.title}
                            </h1>
                        </div>

                        <div className="glass-panel p-8 mb-8 border-l-4 border-[var(--primary)]">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Rocket className="text-[var(--primary)]" size={24} /> Mission Objective
                            </h3>
                            <p className="text-gray-300 text-lg leading-loose font-light italic">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="glass-panel p-6 border border-white/5">
                                <div className="flex items-center gap-3 mb-4 text-[var(--secondary)]">
                                    <Cpu size={20} />
                                    <span className="font-bold uppercase tracking-widest text-xs">Core Technology</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.split(',').map((tech, i) => (
                                        <span key={i} className="text-sm bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel p-6 border border-white/5">
                                <div className="flex items-center gap-3 mb-4 text-[var(--primary)]">
                                    <Globe size={20} />
                                    <span className="font-bold uppercase tracking-widest text-xs">Project Status</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Completed & Verified <br />
                                    <span className="text-white/40 text-xs">Updated on {new Date(project.updatedAt).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-32 py-12 text-center text-gray-500 text-sm border-t border-white/5 relative z-10">
                &copy; 2026 Md Muntasir Mahmud Amit. All Rights Reserved.
            </footer>
        </main>
    )
}
