'use client'
import { useState, useEffect } from 'react'
import { ArrowLeft, Mail, Paperclip, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Message {
    id: number
    name: string
    email: string
    subject: string
    message: string
    contactNumber: string
    attachmentUrl: string | null
    createdAt: string
}

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isDeleting, setIsDeleting] = useState<number | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = () => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(data => setMessages(data))
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this transmission?')) return

        setIsDeleting(id)
        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id))
            } else {
                const data = await res.json().catch(() => ({}))
                alert(`Error: ${data.error || 'Failed to delete'} (Status: ${res.status})`)
            }
        } catch (error) {
            alert('Network error while deleting message')
        } finally {
            setIsDeleting(null)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition"><ArrowLeft size={20} /> Back</Link>
                    <h1 className="text-3xl font-bold">Incoming Transmissions</h1>
                </div>

                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="glass-panel p-6 hover:bg-white/5 transition relative group">
                            <button
                                onClick={() => handleDelete(msg.id)}
                                disabled={isDeleting === msg.id}
                                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs"
                            >
                                <Trash2 size={16} /> {isDeleting === msg.id ? 'Deleting...' : 'Delete'}
                            </button>

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-black font-bold text-lg">
                                        {msg.name[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{msg.name}</h3>
                                        <p className="text-sm text-gray-400">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-gray-500 flex flex-col items-end pr-12 group-hover:pr-20 transition-all">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                                    <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>

                            <h4 className="text-lg font-semibold mb-2 text-[var(--primary)]">{msg.subject}</h4>
                            <p className="text-gray-300 whitespace-pre-wrap mb-4 font-light leading-relaxed">{msg.message}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-white/5 pt-4">
                                <span>Contact: {msg.contactNumber}</span>
                                {msg.attachmentUrl && (
                                    <a href={msg.attachmentUrl} target="_blank" className="flex items-center gap-1 text-[var(--secondary)] hover:underline">
                                        <Paperclip size={14} /> View Attachment
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                    {messages.length === 0 && <p className="text-center text-gray-500 py-10">No messages received yet.</p>}
                </div>
            </div>
        </div>
    )
}
