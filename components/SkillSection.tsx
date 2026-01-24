'use client'
import { motion } from 'framer-motion'

interface Skill {
    id: number
    name: string
    level: number
}

export default function SkillSection({ skills }: { skills: Skill[] }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {skills.map((skill) => (
                <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="glass-panel p-6 text-center hover:bg-white/5 transition-colors group relative overflow-hidden"
                >
                    {/* Subtle background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="text-base font-semibold text-gray-300 mb-4 relative z-10 uppercase tracking-tighter">{skill.name}</div>

                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative z-10">
                        <motion.div
                            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
                            viewport={{ once: true }}
                        />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}
