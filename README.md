# Naya's Twenty - A Romantic Birthday Scrapbook

This is a Next.js web application created as a personalized, interactive birthday scrapbook for Sania Ripatul Inayah (Naya) to celebrate her 20th birthday.

## 🎯 Purpose

To provide a unique and emotional web-based birthday card that resembles a physical scrapbook, filled with memories, messages, and interactive elements.

## 📅 Core Features

*   **Countdown Timer**: Counts down to June 30, 2025.
*   **Swipeable Scrapbook Pages**: Navigate through pages with messages and memories.
*   **Scrapbook Design**: Pages feature photo cutouts, doodles, sticky notes, and washi tape aesthetics.
*   **Interactive Elements**: Confetti animations and audio playback on specific pages.
*   **Sound & Music**: Background music and sound effects to enhance the experience.

## 🎨 Design

*   **Color Palette**: Pastel pink (#FFD1DC), Soft White (#F8F8FF), Romantic Red (#F08080).
*   **Typography**: Belleza (headlines) and Alegreya (body text).
*   **Layout**: Mobile-first responsive design.

## 💻 Tech Stack

*   Next.js (React Framework)
*   Tailwind CSS (Styling)
*   Shadcn/UI (UI Components)
*   Tone.js (Web Audio)
*   Canvas Confetti (Confetti Animations)
*   Lucide React (Icons)

## 🛠️ Getting Started

### Prerequisites

*   Node.js (version 18.x or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd nayas-twenty
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To run the app in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create an optimized build in the `.next` folder.

## 🚀 Deployment to Vercel

Vercel is a great platform for deploying Next.js applications.

1.  **Sign up/Log in to Vercel**: Go to [vercel.com](https://vercel.com/) and create an account or log in.
2.  **Connect your Git Repository**:
    *   Click "Add New..." -> "Project".
    *   Import your Git repository (e.g., from GitHub, GitLab, Bitbucket).
3.  **Configure Project**:
    *   Vercel usually auto-detects Next.js projects. The default settings should work.
    *   **Framework Preset**: Should be "Next.js".
    *   **Build Command**: `npm run build` or `yarn build` (usually `next build`).
    *   **Output Directory**: `.next` (Vercel default for Next.js).
    *   **Install Command**: `npm install` or `yarn install`.
    *   You can add Environment Variables if needed (e.g., for API keys if you extend the app).
4.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application.
5.  **Access Your Site**: Once deployed, Vercel will provide you with a URL to access your live application (e.g., `nayas-twenty-xxxx.vercel.app`). You can also set up a custom domain.

### Placeholder Assets

This project uses placeholder audio files in the `public/audio/` directory. For a complete experience, replace these files with actual audio content:

*   `public/audio/background_music.mp3`: Gentle background music.
*   `public/audio/page-turn.mp3`: Sound effect for page transitions.
*   `public/audio/confetti_sound.mp3`: Sound effect for confetti.
*   `public/audio/naya_message.mp3`: Personalized voice message for Page 5.
*   `public/audio/surprise_soundtrack.mp3`: Surprise audio for the Final Page.

Images are currently using `https://placehold.co`. Replace these with actual photos as desired, using the `next/image` component.

## 💡 Future Enhancements (Optional)

*   **Full Swipeable Pages**: Integrate a library like SwiperJS (React version) or Framer Motion for more fluid, touch-based page transitions.
*   **Database Integration**: Use Firebase Firestore or a similar service to store user-uploaded content or dynamic messages (if the app were to be configurable by others).
*   **More Animations**: Add more SVG/CSS animations for doodles, floating hearts, etc.
*   **"Shake to Reveal"**: Implement motion API for mobile-specific interactions.
*   **Custom Audio Recorder**: Allow users to record a voice message directly in the app.

---

Made with ❤️ for Naya.
