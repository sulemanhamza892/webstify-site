"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

function TemplateCard({ images, title, description, badge, href }) {
  const [index, setIndex] = useState(0);

  const handleLeave = () => {
    setIndex(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => {
        let i = 0;
        const interval = setInterval(() => {
          i = (i + 1) % images.length;
          setIndex(i);
        }, 1500);
        window.__cardInterval = interval;
      }}
      onHoverEnd={() => {
        clearInterval(window.__cardInterval);
        handleLeave();
      }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-colors block cursor-pointer"
    >
      <div className="relative h-48 rounded-xl overflow-hidden mb-6 bg-black/40">
        {badge && (
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 right-3 z-10 text-2xl"
          >
            {badge}
          </motion.span>
        )}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={title}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <h3 className="text-white font-medium text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </motion.a>
  );
}

function HeroVisual() {
  const images = [
    "/images/aurora/AURORA_Home.png",
    "/images/guard/hero.png",
    "/images/slate/hero.png",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mt-16 w-full max-w-3xl rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden shadow-2xl"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
      </div>
      <div className="relative w-full aspect-[16/10]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt="Webstify template preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 15%" }}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const howItWorksRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start start", "end end"],
  });
  const dot1Opacity = useTransform(scrollYProgress, [0, 0.3], [0.25, 1]);
  const dot2Opacity = useTransform(scrollYProgress, [0.35, 0.65], [0.25, 1]);
  const dot3Opacity = useTransform(scrollYProgress, [0.7, 1], [0.25, 1]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-5 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        <span className="text-white font-semibold tracking-tight text-lg">
          Webstify
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#templates" className="hover:text-white transition">Templates</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#philosophy" className="hover:text-white transition">About</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
          <a href="mailto:sulemanhamza892@gmail.com" className="hover:text-white transition">Contact</a>
        </div>
        <a href="https://www.wix.com/studio/community/partners/webstify" target="_blank" rel="noopener noreferrer" className="hidden md:inline-block text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full px-5 py-2 hover:bg-white/20 transition">Explore Templates</a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-[72px] left-0 w-full bg-black/95 backdrop-blur-md z-40 md:hidden flex flex-col items-center gap-6 py-8 text-gray-300 text-lg">
          <a href="#templates" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Templates</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-white transition">How It Works</a>
          <a href="#philosophy" onClick={() => setMenuOpen(false)} className="hover:text-white transition">About</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-white transition">FAQ</a>
          <a href="mailto:sulemanhamza892@gmail.com" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Contact</a>
          <a href="https://www.wix.com/studio/community/partners/webstify" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full px-6 py-3 hover:bg-white/20 transition">Explore Templates</a>
        </div>
      )}

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 60, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(60, 108, 246, 0.3)" }}
          ></motion.div>
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -70, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(48, 97, 247, 0.3)" }}
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
          Now live on the Wix Studio Marketplace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-white"
        >
          Design, distilled.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-gray-400"
        >
          Webstify crafts premium website templates for teams building what&apos;s next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://www.wix.com/studio/community/partners/webstify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black bg-white rounded-full px-6 py-3 hover:bg-gray-200 transition-colors"
          >
            Browse the Shop
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#templates"
            className="text-sm font-medium text-white border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors"
          >
            See Templates
          </motion.a>
        </motion.div>

        <HeroVisual />
      </main>

      <div className="overflow-hidden border-y border-white/10 bg-white/5 py-4 marquee-wrapper">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "Science & Tech Focused",
                "Wix Studio Native",
                "Fully Responsive",
                "SEO Optimized",
                "Multipage Design",
                "Landing Page",
              ].map((text, j) => (
                <span key={j} className="mx-6 text-sm text-gray-400 tracking-wide whitespace-nowrap">
                  {text} <span className="text-gray-600 mx-2">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="px-6 py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 mb-5 mx-auto md:mx-0 flex items-center justify-center text-white">
            🔬
          </div>
          <h3 className="text-white font-medium text-lg mb-2">Science &amp; Tech Focused</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every template is purpose-built for research, deep tech, and innovation-driven brands.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center md:text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 mb-5 mx-auto md:mx-0 flex items-center justify-center text-white">
            🧩
          </div>
          <h3 className="text-white font-medium text-lg mb-2">Built Natively for Wix Studio</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            No plugins, no workarounds — designed from the ground up using Wix Studio&apos;s own tools.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center md:text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 mb-5 mx-auto md:mx-0 flex items-center justify-center text-white">
            ⚡
          </div>
          <h3 className="text-white font-medium text-lg mb-2">Fast to Customize</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Clean structure and sensible defaults mean you&apos;re editing content in minutes, not hours.
          </p>
        </motion.div>
      </section>

      <section id="philosophy" className="px-6 py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            About Webstify
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Webstify specializes in the Science &amp; Technology sector. I design high-performance templates for tech startups, AI innovators, and scientific organizations — merging clean aesthetics with technical precision, so every template is fully responsive, SEO-optimized, and built to handle the demands of the modern tech world. Whether you&apos;re launching a cybersecurity firm or an IoT platform, Webstify gives you a professional foundation to build on.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2 h-72 rounded-2xl border border-white/10 bg-white flex items-center justify-center p-4"
        >
          <img src="/images/brand/logo.png" alt="Webstify Logo" className="max-h-full max-w-full object-contain" />
        </motion.div>
      </section>

      <section id="templates" className="min-h-screen px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
          Featured Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="sticky top-24 sm:static z-10">
            <TemplateCard
              images={[
                "/images/aurora/AURORA_Home.png",
                "/images/aurora/Trusted.png",
                "/images/aurora/Core.png",
                "/images/aurora/Discover.png",
                "/images/aurora/Headset.png",
                "/images/aurora/The_Quiet.png",
              ]}
              title="Aurora Shop"
              description="A sleek, multipage e-commerce template for tech and audio brands."
              badge="🔥"
              href="https://www.wix.com/marketplace/template/ca4280c2-61f3-4f0a-bb36-ddc604aade0b"
            />
          </div>
          <div className="sticky top-28 sm:static z-20">
            <TemplateCard
              images={[
                "/images/guard/hero.png",
                "/images/guard/build.png",
                "/images/guard/core.png",
                "/images/guard/services.png",
                "/images/guard/stats.png",
                "/images/guard/trust.png",
              ]}
              title="Guard"
              description="A cybersecurity-focused multipage template for firms protecting the digital frontier."
              badge="🔥"
              href="https://www.wix.com/marketplace/template/4131359a-5f8e-4e36-b4c8-3aa2d6577df1"
            />
          </div>
          <div className="sticky top-32 sm:static z-30">
            <TemplateCard
              images={[
                "/images/slate/hero.png",
                "/images/slate/seond.png",
                "/images/slate/third.png",
                "/images/slate/fourth.png",
                "/images/slate/fifth.png",
              ]}
              title="Slate Consult"
              description="A premium multipage template for IT consulting firms, built with a deep dark aesthetic."
              href="https://www.wix.com/marketplace/template/d6f6b3d0-8102-4c46-84e9-3d47cc2d54ad"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" ref={howItWorksRef} className="md:relative md:h-[300vh]">
        <div className="md:sticky md:top-0 md:h-screen flex flex-col items-center justify-center px-6 py-24 md:py-0 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
            How It Works
          </h2>

          <div className="relative mb-6 hidden md:block h-3 w-full">
            <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-white/10 -translate-y-1/2"></div>
            <motion.div
              className="absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-blue-500 -translate-y-1/2 origin-left"
              style={{ scaleX: scrollYProgress }}
            ></motion.div>
            <div className="grid grid-cols-3 relative h-full">
              <div className="flex justify-center items-center">
                <motion.div
                  style={{ opacity: dot1Opacity }}
                  className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)]"
                ></motion.div>
              </div>
              <div className="flex justify-center items-center">
                <motion.div
                  style={{ opacity: dot2Opacity }}
                  className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)]"
                ></motion.div>
              </div>
              <div className="flex justify-center items-center">
                <motion.div
                  style={{ opacity: dot3Opacity }}
                  className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)]"
                ></motion.div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4 }}
                className="md:hidden w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)] mx-auto mb-4"
              ></motion.div>
              <div className="text-5xl font-semibold text-white/20 mb-4">01</div>
              <h3 className="text-white font-medium text-lg mb-2">Browse the Collection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Explore templates built for Science &amp; Tech brands on the Wix Studio Marketplace.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="md:hidden w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)] mx-auto mb-4"
              ></motion.div>
              <div className="text-5xl font-semibold text-white/20 mb-4">02</div>
              <h3 className="text-white font-medium text-lg mb-2">Purchase &amp; Customize</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Buy directly through Wix, then edit content, colors, and images inside the Wix Studio Editor.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="md:hidden w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_4px_rgba(60,108,246,0.6)] mx-auto mb-4"
              ></motion.div>
              <div className="text-5xl font-semibold text-white/20 mb-4">03</div>
              <h3 className="text-white font-medium text-lg mb-2">Launch Your Site</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Publish with confidence — every template is responsive, SEO-ready, and built to scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-6 py-24 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Do I need Wix Studio experience?",
              a: "No prior experience is required. Wix Studio's editor is beginner-friendly, and every template is structured clearly so you can find your way around quickly.",
            },
            {
              q: "Can I customize colors, fonts, and content?",
              a: "Yes — every element is fully editable inside the Wix Studio Editor, including colors, fonts, text, images, and layout.",
            },
            {
              q: "Are templates mobile responsive?",
              a: "Yes, every template is fully responsive and tested across desktop, tablet, and mobile screen sizes.",
            },
            {
              q: "What's your refund and support policy?",
              a: "Refunds follow Wix Studio Marketplace's official policies. For customization questions or support, feel free to reach out directly via email.",
            },
          ].map((item, index) => (
            <div key={index} className="border border-white/10 rounded-xl p-5 bg-white/5">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left cursor-pointer text-white font-medium flex justify-between items-center"
              >
                {item.q}
                <motion.span
                  animate={{ rotate: openFaq === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 flex-shrink-0 ml-4"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="px-6 py-32 text-center border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-2xl mx-auto leading-tight">
          Built for what&apos;s next. Ready today.
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="https://www.wix.com/studio/community/partners/webstify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black bg-white rounded-full px-6 py-3 hover:bg-gray-200 transition-colors"
          >
            Browse the Shop
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:sulemanhamza892@gmail.com"
            className="text-sm font-medium text-white border border-white/20 rounded-full px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </motion.a>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>© 2026 Webstify. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href="#templates" className="hover:text-white transition">Templates</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#philosophy" className="hover:text-white transition">About</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
      </footer>
    </>
  );
}