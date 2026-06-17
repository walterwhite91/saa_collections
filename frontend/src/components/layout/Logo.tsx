import React from "react";
import Image from "next/image";

export function LogoIcon({ className = "w-16 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo.png"
        alt="SAA Logo"
        fill
        sizes="(max-width: 768px) 96px, 128px"
        className="object-contain"
        priority
      />
    </div>
  );
}

export function BrandLogo({ className = "w-56 h-16 md:w-80 md:h-20" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo_1.png"
        alt="SAA Collection Logo"
        fill
        sizes="(max-width: 768px) 224px, 320px"
        className="object-contain object-center lg:object-left"
        priority
      />
    </div>
  );
}
