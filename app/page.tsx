import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight, Download, ExternalLink, Code2, Mail, Github, Linkedin, Calendar, Briefcase, GraduationCap, Award, BookOpen, Terminal, Cpu, Rocket } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import SkillSection from '@/components/SkillSection'


interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  link: string | null
  techStack: string
  linkType: string
  createdAt: Date
  updatedAt: Date
}

interface Skill {
  id: number
  name: string
  level: number
}

interface Experience {
  id: number
  role: string
  company: string
  companyUrl: string | null
  period: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export const revalidate = 0


const education = [
  {
    degree: "B.Sc. in Computer Science",
    school: "BRAC University",
    year: "2021 - 2025"
  },
  {
    degree: "Higher Secondary School Certificate",
    school: "Milestone College",
    year: "2020",
    details: "GPA: 5.00"
  },
  {
    degree: "Secondary School Certificate",
    school: "Santhia Pilot High School",
    year: "2018",
    details: "GPA: 5.00"
  }
]



const activities = [
  {
    role: "General Secretary",
    org: "BRAC University Response Team",
    details: "Led 250+ students, conducted stakeholder meetings, and negotiated with NGOs. Organized various social impactful projects such as: Blood Donation Campaign, Winter Campaign, Project Hashimukh (A Ramadan Initiative), Breast Cancer Awareness Campaign, and many more."
  },
  {
    role: "Coordinator of HRM",
    org: "BRAC University Adventure Club",
    details: "Managed member databases and oversaw administrative operations. Ensured seamless organizational communication."
  },
  {
    role: "ICT Instructor",
    org: "Project Srijon",
    details: "Volunteered to conduct ICT training sessions, teaching fundamental computer skills and digital literacy to students."
  }
]

export default async function Home() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  const activeCV = await prisma.cV.findFirst({ where: { isActive: true } })
  const profile = await prisma.profile.findFirst()
  const dbSkills = await prisma.skill.findMany()
  const dbExperiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } })

  const displaySkills = dbSkills || []
  const displayExperiences = dbExperiences || []

  return (
    <main className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--primary)] selection:text-black relative">
      <nav className="absolute top-0 w-full p-6 flex justify-end items-center z-50 pointer-events-none">
        <div className="container mx-auto flex justify-end items-center">
          <div className="flex gap-6 pointer-events-auto">
            <Link href="/admin" className="hover:text-[var(--primary)] text-sm uppercase tracking-widest transition-colors font-semibold mix-blend-difference">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-32 lg:pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-5 pointer-events-none blur-3xl"></div>
        <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-[var(--secondary)] rounded-full blur-[100px] opacity-10 animate-pulse"></div>

        <div className="z-10 container max-w-6xl animate-[float_6s_ease-in-out_infinite]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block border border-[var(--primary)] rounded-full px-4 py-1 mb-6 text-xs tracking-[0.2em] text-[var(--primary)] uppercase bg-[var(--primary)]/10 backdrop-blur-sm">
                SQA Engineer
              </div>
              <h1 className="text-5xl md:text-8xl mb-8 font-black tracking-tighter leading-[0.9]">
                MUNTASIR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] neon-text leading-tight">MAHMUD AMIT</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                SQA Engineer, CS Graduate, Data Science Enthusiast, and Python Developer.
              </p>

              <div className="flex gap-6 justify-center lg:justify-start mb-12">
                <a href="https://github.com/mma1166" target="_blank" className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"><Github /></a>
                <a href="https://www.linkedin.com/in/muntasiramit/" target="_blank" className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"><Linkedin /></a>
                <a href="mailto:muntasir145@gmail.com" className="hover:text-[var(--primary)] transition-colors transform hover:scale-110"><Mail /></a>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Link href="#contact" className="btn-primary">
                  Contact Me <ArrowRight size={20} />
                </Link>
                {activeCV ? (
                  <a href={activeCV.url} download className="px-6 py-2.5 rounded-full border border-[var(--glass-border)] hover:border-[var(--primary)] transition-all flex items-center gap-2 hover:bg-white/5">
                    Download Resume <Download size={18} />
                  </a>
                ) : (
                  <span className="px-6 py-2.5 text-gray-500 text-sm flex items-center border border-transparent">Resume Not Available</span>
                )}
              </div>
            </div>

            {/* Profile Picture */}
            {profile?.imageUrl && (
              <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative group">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] rounded-[3rem] opacity-25 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 border-2 border-[var(--primary)] animate-[spin_15s_linear_infinite] rounded-[3rem] opacity-20"></div>

                  {/* Modern Squircle Frame */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-2 border-white/10 p-2 bg-black/40 backdrop-blur-md shadow-2xl">
                    <img
                      src={profile.imageUrl}
                      alt="Md Muntasir Mahmud Amit"
                      className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 container max-w-4xl">
        <h2 className="text-3xl font-bold mb-10 text-[var(--primary)] flex items-center gap-3"><Terminal size={28} /> About Me</h2>
        <div className="glass-panel p-10 text-lg text-gray-300 leading-relaxed space-y-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <p>
            I'm a Computer Science graduate from BRAC University with professional experience in Software Quality Assurance. My expertise spans manual testing, test automation with Cypress, and BDD frameworks.
          </p>
          <p>
            I'm passionate about delivering reliable software through meticulous testing and have a strong foundation in test planning, case design, and SDLC/STLC methodologies. Beyond QA, I'm enthusiastic about Data Science, Machine Learning, and Large Language Models.
          </p>
        </div>
      </section>

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 py-32">
        {/* Education */}
        <section>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><GraduationCap className="text-[var(--secondary)]" /> Education</h2>
          <div className="space-y-8">
            {education.map((edu, i) => (
              <div key={i} className="glass-panel p-8 hover:bg-white/5 transition flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-full mt-1 shrink-0">
                  <BookOpen size={24} className="text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  <p className="text-gray-400 text-lg mb-2">{edu.school}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {edu.year}</span>
                    {edu.details && <span className="text-[var(--primary)] font-medium">• {edu.details}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Briefcase className="text-[var(--secondary)]" /> Experience</h2>
          <div className="space-y-8">
            {displayExperiences.map((exp: Experience) => (
              <div key={exp.id} className="glass-panel p-8 hover:bg-white/5 transition border-l-4 border-l-[var(--secondary)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 whitespace-nowrap">{exp.period}</span>
                </div>
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] mb-4 font-semibold hover:underline inline-flex items-center gap-1.5"
                  >
                    {exp.company} <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="text-[var(--primary)] mb-4 font-semibold">{exp.company}</p>
                )}
                <p className="text-base text-gray-400 leading-loose whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="py-32 container">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Cpu className="text-[var(--primary)]" size={28} /> Skills Matrix</h2>
        <SkillSection skills={displaySkills} />
      </section>

      {/* Projects Section */}
      <section className="py-32 container mt-24" id="projects">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Rocket className="text-[var(--secondary)]" size={28} /> Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project: Project) => (
            <div key={project.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]">
              <div className="aspect-[16/10] bg-gray-900 overflow-hidden relative">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 bg-white/5">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                      <Terminal size={32} className="text-[var(--primary)] opacity-50" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-4">
                  {project.link && (
                    <a href={project.link} target="_blank" className="btn-primary w-full max-w-[200px] justify-center scale-90 hover:scale-100 transition-all">
                      {project.linkType === 'live' ? 'Live Project' : 'View Repository'} <ExternalLink size={18} />
                    </a>
                  )}
                  <Link href={`/projects/${project.id}`} className="bg-white/10 hover:bg-white/20 text-white w-full max-w-[200px] py-3 rounded-full flex items-center justify-center gap-2 transition-all border border-white/10 scale-90 hover:scale-100">
                    Read Details <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors leading-tight">{project.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack && project.techStack.split(',').map((tech, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 border border-white/10 rounded-md text-gray-300 bg-white/5">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 container max-w-6xl">
        <div className="glass-panel p-12 border border-[var(--primary)]/20 shadow-[0_0_50px_rgba(0,243,255,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary)]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            {/* Image Container (Left on Desktop) */}
            <div className="w-full md:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
              <img
                src="/images/thesis_v2.png"
                alt="Undergraduate Thesis"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Text Content (Right on Desktop) */}
            <div className="flex-1">
              <h4 className="text-[var(--primary)] font-bold tracking-[0.2em] uppercase mb-4 text-sm flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[var(--primary)] inline-block"></span> Undergraduate Thesis
              </h4>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Efficacy of Large Language Models in Facilitating Exam Preparation</h3>
              <p className="text-gray-300 leading-loose mb-8 text-lg">
                Developed the first MBBS-specific dataset in Bangladesh and evaluated 11 prominent Large Language Models.
                Implemented a RAG-based question-answer generation system to assist medical students.
              </p>
              <div className="flex justify-start">
                <a href="https://dspace.bracu.ac.bd/xmlui/handle/10361/26705" target="_blank" className="btn-primary px-8 py-3">
                  Read Publication <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Curricular */}
      <section className="py-32 mt-24 container">
        <h2 className="text-3xl font-bold mb-12 border-l-4 border-[var(--primary)] pl-6">Beyond Core</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div key={i} className="glass-panel p-8 hover:-translate-y-2 transition duration-300 flex flex-col items-start h-full">
              <div className="mb-6 bg-[var(--secondary)]/10 p-4 rounded-xl text-[var(--secondary)]">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{act.org}</h3>
              <p className="text-[var(--primary)] text-sm font-bold uppercase tracking-wider mb-4">{act.role}</p>
              <p className="text-gray-400 leading-relaxed text-sm">{act.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 container" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-none">Let's work <br /> <span className="text-[var(--primary)]">together.</span></h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-md">
              Looking to enhance your software's reliability or need expert automation? I am available for freelance SQA consultations and full-time positions.
              Let&apos;s ensure excellence together.
            </p>
            <div className="space-y-6 text-lg">
              <p className="flex items-center gap-6 text-gray-300 p-4 rounded-xl hover:bg-white/5 transition"><Mail className="text-[var(--primary)]" size={24} /> muntasir145@gmail.com</p>
              <p className="flex items-center gap-6 text-gray-300 p-4 rounded-xl hover:bg-white/5 transition"><Calendar className="text-[var(--primary)]" size={24} /> 01721857708</p>
              <p className="flex items-center gap-6 text-gray-300 p-4 rounded-xl hover:bg-white/5 transition"><Briefcase className="text-[var(--primary)]" size={24} /> D.I.T Project Merul Badda Dhaka</p>
            </div>
          </div>
          <div className="glass-panel p-10 lg:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5">
        &copy; 2026 Md Muntasir Mahmud Amit. All Rights Reserved.
      </footer>
    </main>
  )
}
