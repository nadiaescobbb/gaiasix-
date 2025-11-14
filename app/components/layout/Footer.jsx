"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Columna 1: Marca */}
        <button 
          onClick={() => router.push('/')}
          className="transition-opacity hover:opacity-80"
        >
          <Image 
            src="/logo.avif"
            alt="GAIA SIX"
            width={120}
            height={40}
            priority
          />
        </button>

        {/* Columna 2: Contacto */}
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Mail size={14} />
            gaiashowrrom@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} />
            +54 9 2964479923
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} />
            Tierra del Fuego
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={14} />
            Cambios
          </p>
        </div>

        {/* Columna 3: Redes */}
        <div>
          <a 
            href="https://instagram.com/gaiasix" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Instagram size={20} className="hover:text-red-800 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
