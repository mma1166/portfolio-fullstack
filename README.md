# 🚀 Professional SQA Engineer Portfolio

A modern, high-performance, and fully dynamic portfolio website built specifically for SQA Engineers and Automation Specialists. This project features a robust admin dashboard to manage projects, skills, and site content in real-time.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Staggered entry, dynamic progress bars)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: Custom React hooks with optimized feedback states

### Backend & Database
- **Runtime**: Node.js
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/) (Type-safe database client)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Secure admin credentials)

### Cloud Services & Hosting
- **Image Hosting**: [Cloudinary](https://cloudinary.com/) (Optimized asset delivery)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

---

## ✨ Features

- **Dynamic Skills Matrix**: Manage your technical skills and proficiency levels from the admin panel with live updates on the frontend.
- **Project Case Studies**: Showcase your testing & automation work with detailed descriptions and external links.
- **Admin Command Center**: A secure, glassmorphic dashboard to manage:
    - **Projects Database**: Add, edit, and delete portfolio entries.
    - **Skills Matrix**: Real-time slider-based skill level management.
    - **CV Vault**: Upload and set the active version of your resume.
    - **Profile Settings**: Update profile pictures and persona details.
    - **Comms Uplink**: View incoming messages from the contact form.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Modern Aesthetics**: Features glassmorphism, neon highlights, and premium typography.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── admin/            # Protected Admin Dashboard
│   ├── api/              # Server-side API Routes
│   ├── projects/         # Project Detailed Pages
│   └── page.tsx          # Main Landing Page
├── components/           # Reusable UI Components
│   └── SkillSection.tsx  # Animated Skills Matrix
├── lib/                  # Shared Utilities (Prisma, Auth, Cloudinary)
├── prisma/               # Database Schema & Seed Scripts
├── public/               # Static Assets
└── package.json          # Project Dependencies
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- A Neon PostgreSQL instance
- A Cloudinary account for asset hosting

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="your-secret"
CLOUDINARY_CLOUD_NAME="your-name"
CLOUDINARY_API_KEY="your-key"
CLOUDINARY_API_SECRET="your-secret"
```

### 3. Installation
```bash
npm install
```

### 4. Database Setup
```bash
npx prisma db push
node prisma/seed.js  # Seeds the admin user & initial skills
```

### 5. Run Locally
```bash
npm run dev
```

---

## 🔒 Security
- Protected admin routes using NextAuth session validation.
- Secure environment variable management.
- Type-safe database queries via Prisma.

---

## 📄 License
© 2026 Md Muntasir Mahmud Amit. All Rights Reserved.
