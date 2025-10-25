'use client';

import React, { useState, useEffect } from 'react';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';

// Data
import { products, categories, heroImages } from './data/products';

// Services
import { authService } from './services/authService';
import { orderService } from './services/orderService';

// Utils
import { calculateCartTotal, countCartItems } from './utils/formatters';

export default function GaiaSix() {
  // State management
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [orderHistory, setOrderHistory] = useState([]);