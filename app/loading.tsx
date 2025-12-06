// components/shared/BananLogo.tsx
interface BananLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export default function BananLogo({ 
  size = 'md', 
  variant = 'full',
  className = ''
}: BananLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-20 h-20 text-2xl'
  };

  const LogoIcon = () => (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* تصميم موزة مع رمز المتجر */}
      <path 
        d="M30,20 Q50,5 70,20 Q85,35 80,60 Q75,85 50,95 Q25,85 20,60 Q15,35 30,20 Z" 
        fill="url(#bananaGradient)" 
        stroke="#F59E0B" 
        strokeWidth="2"
      />
      {/* تفاصيل داخل الموزة */}
      <path 
        d="M40,35 Q50,30 60,35 Q65,40 60,50 Q55,60 50,65 Q45,60 40,50 Q35,40 40,35 Z" 
        fill="#FFFFFF" 
        fillOpacity="0.3"
      />
      {/* رمز المتجر داخل الموزة */}
      <rect x="45" y="45" width="10" height="20" rx="2" fill="#3B82F6" />
      <rect x="43" y="40" width="14" height="4" rx="2" fill="#3B82F6" />
      
      <defs>
        <linearGradient id="bananaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LogoText = () => (
    <span className={`font-bold ${className}`}>
      <span className="text-[#F59E0B]">Banan</span>
      <span className="text-[#3B82F6]">App</span>
    </span>
  );

  if (variant === 'icon') return <LogoIcon />;
  if (variant === 'text') return <LogoText />;

  return (
    <div className={`flex items-center justify-center min-h-screen gap-2 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}