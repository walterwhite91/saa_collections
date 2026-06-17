"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 hide-scrollbar">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative aspect-[3/4] w-20 md:w-full bg-parchment overflow-hidden transition-all duration-300 ${mainImage === img ? 'ring-1 ring-umber opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            <Image
              src={`/images/${img}`}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      <div 
        className="relative aspect-[3/4] w-full bg-parchment overflow-hidden cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={`/images/${mainImage}`}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-200 ${isZoomed ? "scale-[2]" : "scale-100"}`}
          style={
            isZoomed
              ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }
              : { transformOrigin: "center center" }
          }
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
