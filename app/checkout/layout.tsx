// app/checkout/layout.tsx
"use client";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// ✅ Inicializar Stripe con tu clave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <Elements 
      stripe={stripePromise}
      options={{
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
          },
        ],
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#000000', 
            colorBackground: '#ffffff',
            colorText: '#000000',
            fontFamily: 'var(--font-body)',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}