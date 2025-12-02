"use client";

import { ContactHero } from '../../components/contact/ContactHero';
import { ContactInfo } from '../../components/contact/ContactInfo';
import { ContactForm } from './../../components/contact/ContactForm/ContactForm';
import { FAQ } from './../../components/contact/FAQ';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
            
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}