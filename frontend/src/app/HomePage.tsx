import React from 'react';
import Navbar from './home/Navbar';
import HeroSection from './home/HeroSection';
import ServicesSection from './home/ServicesSection';
import AboutSection from './home/AboutSection';
import TeamSection from './home/TeamSection';
import BookingSection from './home/BookingSection';
import TestimonialsSection from './home/TestimonialsSection';
import ContactSection from './home/ContactSection';
import Footer from './home/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <div id="booking">
          <BookingSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;