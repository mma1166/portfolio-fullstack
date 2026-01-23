import Link from 'next/link'
import { FileText, Briefcase, MessageSquare, User, Lock } from 'lucide-react'
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import LogoutButton from '@/components/LogoutButton'
import { authOptions } from '@/lib/auth'

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/admin/login")
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold neon-text">Command Center</h1>
                <LogoutButton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Link href="/admin/projects" className="glass-panel p-8 hover:bg-white/5 transition block group border-l-4 border-l-[var(--primary)]">
                    <Briefcase size={40} className="mb-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold mb-2">Projects Database</h2>
                    <p className="text-gray-400">Manage portfolio entries. Add, Edit, Delete.</p>
                </Link>

                <Link href="/admin/cv" className="glass-panel p-8 hover:bg-white/5 transition block group border-l-4 border-l-[var(--secondary)]">
                    <FileText size={40} className="mb-4 text-[var(--secondary)] group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold mb-2">CV Vault</h2>
                    <p className="text-gray-400">Upload new PDF versions and set active CV.</p>
                </Link>

                <Link href="/admin/messages" className="glass-panel p-8 hover:bg-white/5 transition block group border-l-4 border-l-green-400">
                    <MessageSquare size={40} className="mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold mb-2">Comms Uplink</h2>
                    <p className="text-gray-400">Read incoming transmissions from clients.</p>
                </Link>

                <Link href="/admin/profile" className="glass-panel p-8 hover:bg-white/5 transition block group border-l-4 border-l-purple-400">
                    <User size={40} className="mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold mb-2">Profile Identity</h2>
                    <p className="text-gray-400">Update your profile picture and persona.</p>
                </Link>

                <Link href="/admin/settings" className="glass-panel p-8 hover:bg-white/5 transition block group border-l-4 border-l-red-400">
                    <Lock size={40} className="mb-4 text-red-400 group-hover:scale-110 transition-transform" />
                    <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
                    <p className="text-gray-400">Change your administrative password.</p>
                </Link>
            </div>

            <div className="mt-20 text-center">
                <Link href="/" target="_blank" className="btn-primary">View Live Site</Link>
            </div>
        </div>
    )
}
