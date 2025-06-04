import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 120 120" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5253E" />
            <stop offset="100%" stopColor="#C71F36" />
          </linearGradient>
          <filter id="blueGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#00C4FF" floodOpacity="0.4" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="greenGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#39FF85" floodOpacity="0.4" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Isometric cube */}
        <g className="transform translate-x-5 translate-y-10">
          {/* Bottom face */}
          <polygon 
            points="20,70 60,90 100,70 60,50" 
            fill="#E5253E" 
            stroke="#00C4FF" 
            strokeWidth="1"
            filter="url(#blueGlow)"
          />
          
          {/* Left face */}
          <polygon 
            points="20,30 20,70 60,90 60,50" 
            fill="url(#cubeGradient)" 
            stroke="#00C4FF" 
            strokeWidth="1"
            filter="url(#blueGlow)"
          />
          
          {/* Right face */}
          <polygon 
            points="60,50 60,90 100,70 100,30" 
            fill="#C71F36" 
            stroke="#00C4FF" 
            strokeWidth="1"
            filter="url(#blueGlow)"
          />
          
          {/* Top face */}
          <polygon 
            points="20,30 60,50 100,30 60,10" 
            fill="#E5253E" 
            stroke="#00C4FF" 
            strokeWidth="1"
            filter="url(#blueGlow)"
          />
          
          {/* PUBG Airdrop crate on top */}
          <g className="animate-pulse-slow" filter="url(#greenGlow)">
            <rect 
              x="48" 
              y="5" 
              width="24" 
              height="15" 
              fill="#39FF85" 
              stroke="#1A1E2B" 
              strokeWidth="1"
            />
            <line 
              x1="48" 
              y1="10" 
              x2="72" 
              y2="10" 
              stroke="#1A1E2B" 
              strokeWidth="1"
            />
            <line 
              x1="60" 
              y1="5" 
              x2="60" 
              y2="20" 
              stroke="#1A1E2B" 
              strokeWidth="1"
            />
            <rect 
              x="56" 
              y="0" 
              width="8" 
              height="5" 
              fill="#39FF85" 
              stroke="#1A1E2B" 
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
} 