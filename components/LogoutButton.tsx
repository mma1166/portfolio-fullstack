'use client'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-red-400 hover:text-red-300 transition font-medium"
        >
            Log Out
        </button>
    )
}
