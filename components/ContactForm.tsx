'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')
        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            })

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset()
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" placeholder="Name *" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors" />
                <input name="contact" placeholder="Contact Number *" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors" />
            </div>
            <input name="email" type="email" placeholder="Email Address *" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors" />
            <input name="subject" placeholder="Subject *" required className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors" />
            <textarea name="message" placeholder="Your Message *" required rows={5} className="p-3 bg-white/5 border border-white/10 rounded focus:border-[var(--primary)] outline-none transition-colors" />

            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Attachment (Optional)</label>
                <input name="file" type="file" className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
            </div>

            <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center mt-4 group">
                {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {status === 'success' && <p className="text-[#00f3ff] text-center font-semibold">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-center">Failed to send message. Please try again.</p>}
        </form>
    )
}
