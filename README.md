# ✨ Sunny Kumar - Professional Portfolio

> A high-performance, interactive portfolio website built with modern web technologies. showcasing creative developer skills through a Neon Cyberpunk aesthetic.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Supabase-blue)

## 🚀 Overview

This portfolio is designed to be more than just a static resume—it's an immersive experience. It features 3D backgrounds, complex animations, and a unique "Desktop Mode Enforcer" for mobile devices to ensure the best possible viewing experience.

### Key Features

-   **🎨 Neon Glassmorphism UI**: A premium dark-mode aesthetic with neon glows and glass cards.
-   **🖥️ Desktop Mode Enforcer**: A custom system that detects mobile devices and intelligently forces a 1200px viewport for a consistent, high-fidelity experience.
-   **📊 Visitor Tracking**: Silent, anonymous visitor logging (IP & Location) integrated with Supabase.
-   **✨ Interactive Hero**: Typewriter effects, parallax hover states, and 3D background elements.
-   **📁 Project Showcase**: Detailed modal views for projects with image galleries and tech stacks.
-   **📝 Contact System**: Fully functional contact form with file/image uploads, stored securely in Supabase.
-   **🔒 Secure Resume Download**: One-click protected download for the latest resume.

## 🛠️ Tech Stack

-   **Core**: React 18, TypeScript, Vite
-   **Styling**: Tailwind CSS, PostCSS
-   **Animations**: Framer Motion (`motion/react`), GSAP
-   **3D Effects**: Three.js, React Three Fiber
-   **Icons**: Lucide React
-   **Backend & Database**: Supabase (PostgreSQL)
-   **Routing**: React Router DOM
-   **Form Handling**: React Hook Form, Zod

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sunny-kumar-mit/portfolio.git
    cd portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 🗄️ Database Setup (Supabase)

To enable all features, run the following SQL migrations in your Supabase SQL Editor:

### 1. Contact Messages
```sql
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    file_url TEXT
);
-- Enable RLS and policies for insert/select
```

### 2. Visitor Tracking
```sql
CREATE TABLE public.site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address TEXT,
    city TEXT,
    country TEXT,
    region TEXT,
    user_agent TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS (Public Insert, Admin Select)
```

## 📱 Mobile Experience

The application includes a `useDesktopEnforcer` hook.
-   **On Mobile Load**: Shows a "Best Viewed on Desktop" polite modal using native mobile scaling.
-   **On Continue**: Forces the viewport to `width=1200`, giving mobile users the full desktop layout experience without breaking the UI.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Based in India 🇮🇳 | Built with ❤️ by **Sunny Kumar**
