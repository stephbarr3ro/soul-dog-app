import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Check, Sparkles, BookOpen, Dog, User, PawPrint, Calendar, Diamond } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const Hero = () => (
  <section className="relative bg-cream flex items-center pt-10 pb-10 md:pt-14 md:pb-14 overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div 
        animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 md:top-20 left-[5%] md:left-[15%] text-navy/10"
      >
        <Sparkles className="w-6 h-6 md:w-12 md:h-12" />
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 md:bottom-40 right-[5%] md:right-[15%] text-gold/20"
      >
        <Star className="w-8 h-8 md:w-16 md:h-16 fill-current" />
      </motion.div>
      
      {/* Hand-drawn style arrow */}
      <div className="absolute top-40 left-[10%] opacity-10 hidden xl:block">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="rotate-[-20deg]">
          <path d="M10 10C30 40 80 10 110 70M110 70L95 65M110 70L105 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
      <div className="text-center mb-4 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 py-2 rounded-full bg-gold/10 text-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-4"
        >
          <Sparkles className="w-2.5 h-2.5" />
          THE ONLY BOOK WRITTEN SPECIFICALLY FOR YOUR CHILD'S GRIEF
        </motion.div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-display text-navy leading-[1.1] md:leading-[0.9] tracking-tight max-w-4xl mx-auto text-balance">
          When Words Aren't Enough, <br />
          <span className="italic font-normal text-gold">Give Them This.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Sidebar - Grouping Style */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden"
        >
          <div className="flex items-center gap-2 text-navy/40 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-8">
            <span>Our Collections</span>
            <ChevronRight className="w-3 h-3 rotate-90" />
          </div>
          
          {[
            { icon: <BookOpen className="w-4 h-4" />, title: "Classic Edition", sub: "75+ Breeds", active: true },
            { icon: <Diamond className="w-4 h-4" />, title: "True Likeness", sub: "Artist Drawn" },
            { icon: <Sparkles className="w-4 h-4" />, title: "Gift Sets", sub: "Premium Bundles" },
            { icon: <PawPrint className="w-4 h-4" />, title: "Keepsakes", sub: "Digital Art" },
          ].map((item, i) => (
            <div 
              key={i}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group",
                item.active ? "bg-white shadow-xl shadow-navy/5 border border-gray-100" : "hover:bg-white/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                item.active ? "bg-gold text-white" : "bg-navy/5 text-navy/40 group-hover:bg-gold/20 group-hover:text-gold"
              )}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-navy uppercase tracking-wider">{item.title}</h4>
                <p className="text-[9px] text-navy/40 uppercase tracking-widest">{item.sub}</p>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-colors", item.active ? "text-navy" : "text-navy/10")} />
            </div>
          ))}
        </motion.div>

        {/* Central Feature Book */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center relative"
        >
          <div className="relative group w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px]">
            {/* Wavy Border Container */}
            <div className="absolute -inset-2 md:-inset-4 border-2 border-navy/5 rounded-[2rem] md:rounded-[3rem] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute -inset-2 md:-inset-4 border-2 border-gold/10 rounded-[2rem] md:rounded-[3rem] rotate-[2deg] group-hover:rotate-0 transition-transform duration-700 delay-75" />
            
            <div className="relative w-full aspect-[4/5] bg-navy rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(27,31,59,0.2)] md:shadow-[0_50px_100px_-20px_rgba(27,31,59,0.4)]">
              <img 
                src="/hero_cover.webp" 
                alt="Featured Story" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
              <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center px-6 md:px-8">
                <h3 className="text-xl md:text-3xl font-display text-cream mb-1 md:mb-2">The Journey Home</h3>
                <p className="text-cream/60 text-[8px] md:text-[10px] uppercase tracking-[0.3em]">A Legacy of Love</p>
                
                {/* Mini Controls Style */}
                <div className="mt-4 md:mt-8 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold animate-pulse" />
                    <span className="text-[7px] md:text-[8px] font-bold text-cream uppercase tracking-widest">Live Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar - Featured Snippet */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 hidden lg:block"
        >
          <div className="bg-white/50 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-xl shadow-navy/5">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-navy overflow-hidden">
                <img src="/kid-dog.jpg" alt="Dog" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs font-bold text-navy uppercase tracking-wider">Luna & Leo</h4>
                <p className="text-[8px] md:text-[9px] text-navy/40 uppercase tracking-widest">Featured Story</p>
              </div>
            </div>
            <p className="text-[11px] md:text-xs text-navy/60 leading-relaxed italic mb-4 md:mb-6">
              "Nothing prepared us for losing Buddy. This book helped our son say goodbye."
            </p>
          </div>

          <div className="space-y-4 px-4">
            <h3 className="text-xl md:text-2xl font-display text-navy leading-tight">
              Your child's grief is real. <br />
              <span className="italic text-gold">So was their love.</span>
            </h3>
            <Link 
              to="/customize"
              className="flex items-center justify-between p-4 bg-navy text-cream rounded-2xl group hover:bg-gold transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Create Their Book</span>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile CTA - Visible only on small screens */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 md:mt-16 flex flex-col items-center gap-6 lg:hidden w-full"
      >
        <Link
          to="/customize"
          className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-gold text-cream font-bold rounded-full text-sm md:text-base shadow-xl hover:-translate-y-1 transition-all"
        >
          Create Their Book — Free Shipping
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href="#how-it-works"
          className="text-navy/40 hover:text-navy text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] transition-colors"
        >
          See the Magic
        </a>
      </motion.div>
    </div>

    {/* Curved Bottom Transition */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto min-h-[40px] md:min-h-[80px]">
        <path d="M0 120L1440 120L1440 40C1440 40 1080 120 720 120C360 120 0 40 0 40L0 120Z" fill="#1B1F3B" />
      </svg>
      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] font-bold text-cream/40 uppercase tracking-[0.3em] md:tracking-[0.5em] whitespace-nowrap">
        The best selling legacy books
      </div>
    </div>
  </section>
);

const AsSeenOn = () => (
  <section style={{ background: '#FBF6F0' }} className="py-12 md:py-20 px-6 md:px-12">

    {/* Trust Badges — above photo */}
    <div className="max-w-5xl mx-auto mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
        className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-navy/5">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-[9px] font-bold text-navy/40 uppercase tracking-[0.3em]">As Seen On</p>
          <div className="w-32 h-10 flex items-center justify-center p-1.5 rounded-xl bg-white border border-gray-100">
            <img src="/abc-horizontal.webp" alt="ABC Nightline" className="w-full h-auto object-contain" />
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-navy/5">
        <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <div>
          <p className="text-[10px] font-bold text-navy uppercase tracking-wider">Therapist Recommended</p>
          <p className="text-[9px] text-navy/50 uppercase tracking-widest">Child Grief Specialists</p>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-sm border border-navy/5">
        <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <div>
          <p className="text-[10px] font-bold text-navy uppercase tracking-wider">100% Satisfaction</p>
          <p className="text-[9px] text-navy/50 uppercase tracking-widest">Guaranteed</p>
        </div>
      </motion.div>
    </div>

    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
      <div className="flex flex-col gap-4 md:gap-6 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-navy/40">As Seen On</span>
        <h3 className="text-3xl md:text-4xl font-display text-navy leading-tight">
          Trusted by families <br className="hidden md:block" />
          <span className="italic">across the country</span>
        </h3>
        <p className="text-navy/50 text-base leading-relaxed max-w-sm">
          Soul Dog Stories has been featured on national media for creating the most meaningful personalized books for families and their dogs.
        </p>
      </div>
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-72 md:w-96 h-72 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-navy/15"
        >
          <img src="/social_proof.jpg" alt="Soul Dog Stories featured" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-2xl shadow-navy/20 flex items-center justify-center p-3 border-4 border-white" style={{ background: '#FBF6F0' }}
        >
          <img src="/abc-horizontal.webp" alt="ABC Nightline" className="w-full h-auto object-contain" />
        </motion.div>
      </div>
    </div>
  </section>
);



const TherapistSection = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-cream relative overflow-hidden">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        {/* Left — Feature callouts + quote */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold">Professionally Endorsed</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm font-bold text-navy uppercase tracking-wider">Child Development Aligned</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm font-bold text-navy uppercase tracking-wider">Opens the Conversation</span>
            </div>
          </div>

          <blockquote className="border-l-2 border-gold pl-6 space-y-4">
            <p className="text-navy/70 text-base md:text-lg leading-relaxed italic">
              "Pet loss is often a child's first experience with grief — and how we respond in that moment shapes how they process loss for the rest of their lives. Soul Dog Stories gives parents a beautiful, therapeutic tool to open that conversation with love rather than silence. I recommend it to every family I work with who is navigating this."
            </p>
            <footer className="space-y-1">
              <p className="text-[10px] font-bold text-navy uppercase tracking-wider">Licensed Child & Adolescent Grief Therapist</p>
              <p className="text-[9px] text-navy/40 uppercase tracking-widest">LCSW — Attribution Coming Soon</p>
            </footer>
          </blockquote>
        </div>

        {/* Right — CTA card */}
        <div className="bg-navy rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-2xl shadow-navy/20">
          <div className="space-y-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold">Join Our Network</p>
            <h3 className="text-2xl md:text-3xl font-display text-cream leading-tight">
              Are you a licensed therapist?
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              We are currently collecting endorsements from licensed therapists. Reach out if you'd like to be featured.
            </p>
          </div>
          <a href="mailto:hello@souldogstories.com" className="inline-flex items-center gap-3 px-6 py-3 bg-gold text-cream font-bold rounded-full hover:bg-white hover:text-navy transition-all text-xs uppercase tracking-widest">hello@souldogstories.com <ChevronRight className="w-4 h-4" /></a>
        </div>
      </motion.div>
    </div>
  </section>
);


const FromRealToForever = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden">
    <div className="max-w-6xl mx-auto">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold">The Transformation</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-navy leading-tight">
          From your real life <br className="hidden md:block" />
          <span className="italic text-gold">to a story that lives forever.</span>
        </h2>
        <p className="text-navy/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Every book is hand-illustrated by professional artists — transforming your real family and dog into a timeless, museum-quality story your child will cherish for life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">

        {/* Real photo */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative group">
          <div className="absolute -inset-1 border-2 border-navy/5 rounded-[2rem] rotate-[-1deg] group-hover:rotate-0 transition-transform duration-700" />
          <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl shadow-navy/10 aspect-[4/5]">
            <img src="/kid-dog.jpg" alt="Real life photo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Your Real Moment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arrow + illustrated */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative group">
          {/* Arrow between photos on desktop */}
          <div className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold shadow-xl items-center justify-center">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -inset-1 border-2 border-gold/20 rounded-[2rem] rotate-[1deg] group-hover:rotate-0 transition-transform duration-700" />
          <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl shadow-gold/10 aspect-[4/5]">
            <img src="/kid-dog-illustration.jpg" alt="Illustrated story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/90 backdrop-blur-md rounded-full">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Hand-Illustrated Forever</span>
              </div>
              <p className="text-white/80 text-[10px] leading-relaxed">
                Premium hardcover • Artist-crafted • Museum quality
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom callouts */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Real Artists", desc: "Every illustration crafted by hand — never AI-generated." },
          { title: "Your Exact Family", desc: "Your child, your dog, your colors, your story." },
          { title: "Printed to Last", desc: "Premium hardcover that survives generations." },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-cream border border-navy/5">
            <p className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1">{item.title}</p>
            <p className="text-navy/50 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StoryBehind = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-navy relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-gold/30 to-transparent" />
    </div>
    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold">The Story Behind Every Book</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-cream leading-tight">
          "When they ask you <span className="italic text-gold">'Where did our dog go?'</span> — this is your answer."
        </h2>
        <p className="text-cream/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Soul Dog Stories turns the hardest conversation into a healing one. A personalized hardcover book crafted entirely around your family and your dog — so the love story never ends.
        </p>
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link
            to="/customize"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-cream font-bold rounded-full hover:bg-white hover:text-navy transition-all shadow-xl text-sm uppercase tracking-widest"
          >
            Create Their Book
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-6xl font-display text-navy mb-4 md:mb-6 leading-tight">
            Crafted with <span className="italic">Obsessive</span> Detail.
          </h2>
          <p className="text-navy/60 text-base md:text-lg leading-relaxed">
            We don't just print books. We create heirlooms using premium materials and world-class illustration.
          </p>
        </div>
        <div className="hidden md:block w-32 h-[1px] bg-navy/10 mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/5 border border-navy/5 rounded-3xl overflow-hidden">
        {[
          { icon: <Dog className="w-6 h-6" />, title: "75+ Breeds", desc: "Every illustration is hand-refined to capture the unique spirit of your dog's breed." },
          { icon: <User className="w-6 h-6" />, title: "Family First", desc: "Include up to up to 5 children — more than any other brand and 3 dogs in a single, cohesive narrative." },
          { icon: <Sparkles className="w-6 h-6" />, title: "True Likeness", desc: "Our premium edition features artists who draw your family from your actual photos." },
          { icon: <PawPrint className="w-6 h-6" />, title: "Legacy Quality", desc: "Archival-grade paper and soft-touch covers designed to last generations." },
          { icon: <Calendar className="w-6 h-6" />, title: "Age Accuracy", desc: "Characters evolve from infancy to age 12 to match your child's stage." },
          { icon: <Diamond className="w-6 h-6" />, title: "Artisan Bound", desc: "Every book is inspected by hand before it leaves our studio." }
        ].map((f, i) => (
          <div
            key={i}
            className="bg-cream p-8 md:p-12 transition-all hover:bg-white group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy mb-6 md:mb-8 transition-all group-hover:bg-gold group-hover:text-white group-hover:rotate-6">
              {f.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-navy mb-3 md:mb-4 uppercase tracking-wider">{f.title}</h3>
            <p className="text-navy/50 leading-relaxed text-xs md:text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Collections = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 bg-white" id="our-books">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Classic Edition */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative aspect-[4/5] bg-cream rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 border border-navy/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/classic-cover.webp" alt="Classic Edition" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-navy text-cream text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                The Original
              </span>
            </div>
          </div>
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-display text-navy mb-1 md:mb-2">The Classic Edition</h3>
              <p className="text-navy/50 uppercase tracking-widest text-[10px] md:text-xs font-bold">Starting at $45</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-navy/10 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <p className="text-navy/60 mb-6 md:mb-8 leading-relaxed max-w-md text-sm md:text-base">
            Beautifully personalized using our signature illustration library. Perfect for a timeless gift.
          </p>
          <Link
            to="/customize?edition=classic"
            className="w-full sm:w-auto inline-block px-8 py-3.5 md:px-10 md:py-4 border-2 border-navy text-navy font-bold rounded-full hover:bg-navy hover:text-white transition-all text-sm md:text-base text-center"
          >
            Customize Classic
          </Link>
        </motion.div>

        {/* True Likeness Edition */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative aspect-[4/5] bg-navy rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/truelikeness-cover.webp" alt="True Likeness Edition" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gold text-cream text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Premium Artist Edition
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-display text-navy mb-1 md:mb-2">True Likeness™</h3>
              <p className="text-gold uppercase tracking-widest text-[10px] md:text-xs font-bold">Starting at $89</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <p className="text-navy/60 mb-6 md:mb-8 leading-relaxed max-w-md text-sm md:text-base">
            Our most exclusive offering. Artists hand-draw your family from your photos for a truly one-of-a-kind masterpiece.
          </p>
          <Link
            to="/customize?edition=true-likeness"
            className="w-full sm:w-auto inline-block px-8 py-3.5 md:px-10 md:py-4 bg-gold text-white font-bold rounded-full shadow-xl hover:bg-navy transition-all text-sm md:text-base text-center"
          >
            Create True Likeness
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export const HowItWorks = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden" id="how-it-works">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-7xl font-display text-navy mb-4 md:mb-6">The Journey to <span className="italic">Magic.</span></h2>
        <div className="w-16 md:w-24 h-[1px] bg-gold mx-auto" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-y-12 gap-x-8 md:gap-x-12">
        {[
          { step: "01", title: "Select Edition", desc: "Choose between Classic or our Artist-drawn True Likeness." },
          { step: "02", title: "Personalize", desc: "Match every detail of your children and beloved dogs." },
          { step: "03", title: "Story & Cover", desc: "Pick the narrative and colors that speak to your heart." },
          { step: "04", title: "Dedication", desc: "Write a message that will be read for years to come." },
          { step: "05", title: "Hand-Bound", desc: "We lovingly create and ship your family heirloom." }
        ].map((s, i) => (
          <div key={i} className={cn(
            "space-y-4 md:space-y-6 group md:col-span-2 lg:col-span-1",
            i === 3 && "md:col-start-2 lg:col-start-auto"
          )}>
            <div className="text-3xl md:text-4xl font-display text-gold/40 transition-all group-hover:text-gold group-hover:translate-x-2">
              {s.step}
            </div>
            <div className="space-y-2 md:space-y-3">
              <h4 className="font-bold text-navy mb-2 md:mb-3 uppercase tracking-[0.2em] text-[10px] md:text-xs">{s.title}</h4>
              <p className="text-navy/50 text-xs md:text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-20 md:py-32 px-6 md:px-12 bg-white" id="reviews">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-px bg-gray-100 md:bg-gray-100 border border-gray-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
        {[
          { author: "Sarah M.", quote: "I sobbed when I opened it. My daughter's Golden Retriever passed last month. This book is everything.", dog: "Golden Retriever" },
          { author: "Jessica L.", quote: "The illustrations look EXACTLY like my kids and our Bernedoodle. I don't know how they did it.", dog: "Bernedoodle" },
          { author: "Grandma Carol", quote: "Ordered two — one for each of my granddaughters. Worth every penny.", dog: "Mixed Breed" }
        ].map((r, i) => (
          <div key={i} className="bg-white p-8 md:p-16 flex flex-col justify-between group hover:bg-navy transition-all duration-500 rounded-[1.5rem] md:rounded-none">
            <div>
              <div className="flex gap-1 text-gold mb-4 md:mb-8">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-lg md:text-2xl font-display text-navy mb-6 md:mb-12 leading-relaxed italic group-hover:text-cream transition-colors">
                "{r.quote}"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-cream flex items-center justify-center font-display text-navy text-base md:text-xl group-hover:bg-gold group-hover:text-white transition-all">
                {r.author[0]}
              </div>
              <div>
                <p className="font-bold text-[10px] md:text-sm text-navy group-hover:text-cream transition-colors">{r.author}</p>
                <p className="text-[8px] md:text-[10px] text-navy/40 uppercase tracking-widest group-hover:text-cream/40 transition-colors">Family of a {r.dog}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="relative bg-navy py-24 md:py-40 overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gold/20 to-transparent" />
    </div>
    
    <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <h2 className="text-4xl md:text-8xl font-display text-cream mb-8 md:mb-12 leading-[1.1] md:leading-[0.95] text-balance">
        Give the gift of <br />
        <span className="italic text-gold">Forever.</span>
      </h2>
      <Link
        to="/customize"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 md:px-16 md:py-7 bg-gold text-cream font-bold rounded-full text-base md:text-xl shadow-2xl hover:scale-105 transition-all hover:bg-white hover:text-navy"
      >
        Start Your Story
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Link>
    </div>
  </section>
);

export const Home = () => (
  <div className="bg-white">
    <Hero />
    <AsSeenOn />
    <TherapistSection />
    <FromRealToForever />
    <StoryBehind />
    <Features />
    <Collections />
    <HowItWorks />
    <Reviews />
    <FinalCTA />
  </div>
);
