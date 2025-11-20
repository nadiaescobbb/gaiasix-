"use client";

import { useState } from "react";
import { ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import { type User as UserType, type Page } from "../../lib/types";

interface HeaderProps {
  currentUser: UserType | null;
  cartItemsCount: number;
  onNavigate: (page: Page) => void;
  onCartToggle: () => void;
  onLogout: () => void;
  currentPage?: Page;
}

export default function Header({
  currentUser,
  cartItemsCount,
  onNavigate,
  onCartToggle,
  onLogout,
  currentPage = "home",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { wishlistItemsCount } = useAppContext();

  const isActive = (page: Page): boolean => currentPage === page;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="transition-opacity hover:opacity-70 flex items-center"
            aria-label="Ir al inicio"
          >
            <Image
              src="/gaialogo-header.png"
              alt="GAIA SIX"
              width={130}
              height={45}
              priority
              className="w-auto h-10"
            />
          </button>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center space-x-10 font-title tracking-widest text-sm">
            {[
              { label: "Prendas", page: "shop" },
              { label: "La Marca", page: "about" },
              { label: "Contacto", page: "contact" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page as Page)}
                className={`uppercase transition ${
                  isActive(item.page as Page)
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ICONOS */}
          <div className="flex items-center space-x-5">

            {/* Wishlist */}
            <button
              onClick={() => onNavigate("wishlist")}
              className="transition relative hover:opacity-70"
              aria-label="Tus favoritos"
            >
              <Heart size={22} className="text-gray-700" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemsCount > 9 ? "9+" : wishlistItemsCount}
                </span>
              )}
            </button>

            {/* Usuario */}
            <button
              onClick={() => onNavigate(currentUser ? "profile" : "auth")}
              className="transition hover:opacity-70"
              aria-label="Mi cuenta"
            >
              <User size={22} className="text-gray-700" />
            </button>

            {/* Carrito */}
            <button
              onClick={onCartToggle}
              className="transition relative hover:opacity-70"
              aria-label="Bolsa"
            >
              <ShoppingBag size={22} className="text-gray-800" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </button>

            {/* Toggle menú mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:opacity-70 transition"
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-2 font-title tracking-wide">
            {[
              { label: "Prendas", page: "shop" },
              { label: "La Marca", page: "about" },
              { label: "Contacto", page: "contact" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page as Page);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 text-sm uppercase rounded transition ${
                  isActive(item.page as Page)
                    ? "bg-gray-100 text-black"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* WISHLIST MOBILE */}
            <button
              onClick={() => {
                onNavigate("wishlist");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded transition"
            >
              <Heart size={18} />
              Tus Favoritos
              {wishlistItemsCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            {/* USUARIO MOBILE */}
            <button
              onClick={() => {
                onNavigate(currentUser ? "profile" : "auth");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded transition"
            >
              <User size={18} />
              {currentUser ? "Mi Cuenta" : "Entrar"}
            </button>

            {/* Cerrar sesión */}
            {currentUser && (
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded transition"
              >
                Cerrar Sesión
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
