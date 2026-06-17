import React from "react";
import Image from "next/image";

export function LogoIcon({ className = "w-16 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo.png"
        alt="SAA Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function BrandLogo({ className = "w-48 h-14 md:w-64 md:h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo_1.png"
        alt="SAA Collection Logo"
        fill
        className="object-contain object-center lg:object-left"
        priority
      />
    </div>
  );
}
