import React, { useEffect } from 'react';
import LandingPage from './pages/landing';
import { renderToReadableStream } from 'react-dom/server';
import Meta from './components/meta';

// Add client-side script for scroll position persistence
const scrollPositionScript = `
  // Save scroll position before page refresh
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  });
  
  // Restore scroll position after page loads
  window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  });
`;

export const App = async (): Promise<any> => {
    return await renderToReadableStream(
        <html lang="en">
            <head>
                <Meta />
                {/* <link rel="stylesheet" href="/public/assets/styles/global.css" /> */}
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&display=swap" />
                <style>
                    {`
                    :root {
                        --color-primary: #E5253E;
                        --color-background: #1A1E2B;
                        --color-accent-blue: #00C4FF;
                        --color-accent-green: #39FF85;
                    }

                    body {
                        background-color: var(--color-background);
                        color: white;
                        font-family: 'Noto Sans Georgian', 'Inter', sans-serif;
                        overflow-x: hidden;
                        width: 100%;
                    }
                    
                    html {
                        overflow-x: hidden;
                        max-width: 100vw;
                    }
                    
                    /* Cyberpunk Scrollbar */
                    ::-webkit-scrollbar {
                        width: 10px;
                        background-color: #141824;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background-color: #141824;
                        border-radius: 10px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, #E5253E 0%, #991b1b 100%);
                        border-radius: 10px;
                        border: 2px solid #141824;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, #ef4444 0%, #b91c1c 100%);
                    }
                    
                    /* Firefox scrollbar */
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: #E5253E #141824;
                    }
                    
                    /* Hide scrollbar for mobile devices */
                    @media (max-width: 768px) {
                        ::-webkit-scrollbar {
                            width: 4px;
                        }
                    }
                    
                    /* Text glow effects */
                    .text-shadow-glow-red {
                        text-shadow: 0 0 5px #E5253E, 0 0 10px #E5253E;
                    }
                    
                    .text-shadow-glow-blue {
                        text-shadow: 0 0 5px #00C4FF, 0 0 10px #00C4FF;
                    }
                    
                    .text-shadow-glow-green {
                        text-shadow: 0 0 5px #39FF85, 0 0 10px #39FF85;
                    }
                    
                    .text-shadow-glow-white {
                        text-shadow: 0 0 5px rgba(255,255,255,0.6), 0 0 10px rgba(255,255,255,0.3);
                    }

                    /* Button glows */
                    .button-glow-red {
                        box-shadow: 0 0 10px rgba(229, 37, 62, 0.5), 0 0 15px rgba(229, 37, 62, 0.3);
                    }
                    
                    .button-glow-blue {
                        box-shadow: 0 0 10px rgba(0, 196, 255, 0.5), 0 0 15px rgba(0, 196, 255, 0.3);
                    }
                    
                    .button-glow-green {
                        box-shadow: 0 0 10px rgba(57, 255, 133, 0.5), 0 0 15px rgba(57, 255, 133, 0.3);
                    }

                    /* Animation keyframes */
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.6;
                        }
                    }
                    
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-8px);
                        }
                    }
                    
                    /* Animation classes */
                    .animate-pulse-slow {
                        animation: pulse 3s ease-in-out infinite;
                    }
                    
                    .animate-float {
                        animation: float 5s ease-in-out infinite;
                    }
                    `}
                </style>
                {/* Add scroll position persistence script */}
                <script dangerouslySetInnerHTML={{ __html: scrollPositionScript }} />
            </head>
            <body className="bg-[#1A1E2B] text-white">
                <LandingPage />
            </body>
        </html>
    )
}
