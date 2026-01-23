'use client'
import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin')
        }
    }, [status, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            })

            if (res?.ok) {
                router.push('/admin')
                router.refresh()
            } else {
                setError('Invalid credentials')
                setIsLoading(false)
            }
        } catch (err) {
            setError('Something went wrong')
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_50%)] opacity-10 blur-3xl"></div>

            <Link href="/" className="relative z-10 mb-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Site
            </Link>

            <form onSubmit={handleSubmit} className="relative z-10 glass-panel p-10 w-full max-w-sm flex flex-col gap-6 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-[var(--primary)]/10 rounded-2xl text-[var(--primary)]">
                        <Lock size={32} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-1">Owner Login</h1>
                        <p className="text-gray-500 text-sm">Secure administrative access</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">Username</label>
                        <input
                            placeholder="Terminal ID"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none text-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">Secret Key</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-[var(--primary)] outline-none text-white transition-all"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-center text-sm font-medium bg-red-500/10 py-2 rounded-lg">{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary justify-center w-full mt-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Verifying...' : 'Login to Dashboard'}
                </button>
            </form>

            <p className="relative z-10 mt-8 text-gray-600 text-xs tracking-widest uppercase">
                Protected by End-to-End Encryption
            </p>
        </div>
    )
}
