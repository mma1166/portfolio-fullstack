'use client'
import { useState } from 'react'
import { ArrowLeft, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage({ type: '', text: '' })

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' })
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            })

            const data = await res.json()
            if (res.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' })
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update password' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-md mx-auto">
                <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Security Settings</h1>
                        <p className="text-gray-500 text-sm">Update your administrative credentials</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none text-white transition-all"
                            required
                        />
                    </div>

                    <div className="h-px bg-white/5"></div>

                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none text-white transition-all"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none text-white transition-all"
                            required
                        />
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-4 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
