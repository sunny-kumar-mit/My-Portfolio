# Sunny Kumar - Premium Portfolio

A high-end, ultra-modern personal portfolio web application featuring cinematic animations, 3D effects, and futuristic interactions designed for recruiters, startups, and clients.

## ✨ Features

### 🎨 Visual Design
- **Neon Cyberpunk Theme**: Deep black backgrounds with neon blue (#00D9FF), electric purple (#B24BF3), and cyan (#4DFFF3) accents
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur and neon outline borders
- **Custom Cursor**: Interactive cursor with hover state changes
- **Smooth Animations**: GSAP scroll-triggered zoom effects and Framer Motion transitions

### 🚀 Technical Features
- **Three.js Background**: Animated 3D particles and geometric shapes that react to mouse movement and scroll
- **Typewriter Animation**: Rotating text in hero section with smooth transitions
- **Scroll Animations**: Parallax effects and zoom animations triggered by scroll position
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Contact Form**: Integrated with Supabase for storing form submissions

### 📱 Sections
1. **Hero Section**: Split layout with professional photo and animated typewriter text
2. **About Me**: Animated text reveal with statistics and highlights
3. **Skills**: Categorized skill cards with hover effects (Frontend, Backend, Database, Tools, Animation)
4. **Projects**: Portfolio showcase with project cards and hover glow effects
5. **Experience**: Timeline-style layout showing career progression
6. **Contact**: Animated contact form with social links and contact information

## Project Info

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS animations
- **UI Components**: shadcn/ui component library
- **3D Graphics**: Three.js for animated backgrounds
- **Animations**: GSAP (ScrollTrigger) + Framer Motion
- **Backend**: Supabase (PostgreSQL database)
- **Form Handling**: React Hook Form + Zod validation
- **Icons & Fonts**: Google Fonts (Inter), Unicode emojis

## Development Guidelines

### How to edit code locally?

You can choose [VSCode](https://code.visualstudio.com/Download) or any IDE you prefer. The only requirement is to have Node.js and npm installed.

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### After installation, follow these steps:

```
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies: npm i
# Step 5: In the IDE terminal, run the command to start the development server: npm run dev -- --host 127.0.0.1
# Step 6: if step 5 failed, try this command to start the development server: npx vite --host 127.0.0.1
```

### How to develop backend services?

Configure environment variables and install relevant dependencies.If you need to use a database, please use the official version of Supabase.

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.
