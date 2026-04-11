import React from 'react';
import { Link } from 'react-router';

/**
 * AuthLayout — shared layout for Login & Register pages.
 * Left: brand panel with floating geometric decorations.
 * Right: glassmorphism form card.
 */
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex bg-obsidian relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ─── LEFT BRAND PANEL ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-mesh items-center justify-center overflow-hidden">
        {/* Ambient gold radial glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[120px] animate-pulse-gold" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-600/8 blur-[100px] animate-pulse-gold" style={{ animationDelay: '1.5s' }} />

        {/* ── Geometric Decorations ── */}
        {/* Circle outline */}
        <div
          className="absolute top-[12%] left-[15%] w-24 h-24 rounded-full border border-gold-500/20 animate-float"
        />
        {/* Small filled circle */}
        <div
          className="absolute top-[8%] left-[18%] w-3 h-3 rounded-full bg-gold-500/40 animate-float-slow"
        />

        {/* Diamond shape */}
        <div
          className="absolute bottom-[20%] left-[10%] w-16 h-16 border border-gold-500/15 animate-float-delayed"
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Diagonal gold lines */}
        <div className="geo-line w-[200px] h-[1px] top-[35%] left-0 rotate-[25deg]" />
        <div className="geo-line w-[150px] h-[1px] bottom-[30%] right-[5%] rotate-[-35deg]" />
        <div className="geo-line w-[1px] h-[180px] top-[10%] right-[30%]" />

        {/* Square outline */}
        <div
          className="absolute bottom-[15%] right-[20%] w-20 h-20 border border-gold-500/10 animate-float-slow"
          style={{ animationDelay: '1s' }}
        />

        {/* Rotating ring */}
        <div className="absolute top-[55%] left-[8%] w-10 h-10 rounded-full border border-dashed border-gold-500/10 animate-spin-slow" />

        {/* ── Brand Content ── */}
        <div className="relative z-10 text-center px-12 animate-slide-in-left">
          {/* Brand Logo */}
          <h1
            className="font-space font-bold tracking-[-0.03em] text-gold-shimmer select-none"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
          >
            SNITCH
          </h1>

          {/* Tagline */}
          <p
            className="mt-4 font-space text-sm tracking-[0.35em] uppercase text-white/60"
          >
            Define Your Style
          </p>

          {/* Decorative underline */}
          <div className="mx-auto mt-6 w-16 h-[1px] gold-gradient opacity-40" />
        </div>

        {/* Additional tiny floating dots */}
        <div className="absolute top-[30%] right-[40%] w-1.5 h-1.5 rounded-full bg-gold-500/30 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[40%] left-[35%] w-1 h-1 rounded-full bg-gold-400/25 animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[70%] right-[15%] w-2 h-2 rounded-full bg-gold-500/15 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* ─── RIGHT FORM PANEL ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative px-6 py-12">
        {/* Subtle background glow */}
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gold-500/5 blur-[80px]" />

        {/* Form Container */}
        <div className="w-full max-w-md relative z-10 animate-slide-in-right opacity-0">
          {/* Glass card */}
          <div className="glass-gold p-10 gold-shadow">
            {/* Mobile Brand (shown on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <h2 className="font-space font-bold text-3xl text-gold-shimmer">SNITCH</h2>
              <p className="mt-1 font-space text-xs tracking-[0.3em] uppercase text-white/50">Define Your Style</p>
            </div>

            {/* Title */}
            <h2 className="font-space font-semibold text-2xl text-gold-gradient animate-fade-up opacity-0">
              {title}
            </h2>
            <p className="mt-2 font-inter text-sm text-white/40 animate-fade-up-delay-1 opacity-0">
              {subtitle}
            </p>

            {/* Decorative separator */}
            <div className="mt-6 mb-8 w-8 h-[1px] gold-gradient opacity-50 animate-fade-up-delay-2 opacity-0" />

            {/* Form children */}
            {children}
          </div>

          {/* Footer links */}
          <div className="mt-8 flex items-center justify-center gap-6 text-white/20 font-inter text-xs uppercase tracking-[0.15em]">
            <span className="hover:text-gold-500/60 transition-colors duration-300 cursor-pointer">Terms</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
            <span className="hover:text-gold-500/60 transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="w-[3px] h-[3px] rounded-full bg-white/10" />
            <span className="hover:text-gold-500/60 transition-colors duration-300 cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
