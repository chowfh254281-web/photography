'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// 準備好每個分類嘅所有相片檔名陣列
const portraitImages = ["7B8A9120-EAE1-4BD6-9DFE-90A5ABE7FD6C", "833ED149-C5DE-414A-8D4A-DFC06A7A0B59_4_5005_c", "DSC00127", "DSC00133", "DSC00338", "DSC00380", "DSC00608", "DSC00672", "DSC00709", "DSC00765", "DSC02991", "DSC02995", "DSC03011", "DSC03014", "DSC03064", "DSC03919", "DSC03982", "DSC04087", "DSC07994", "DSC09267-2", "DSC09480", "DSC09482", "DSC09492", "DSC09669"];
const landscapeImages = ["DSC03300", "DSC04688", "DSC05456", "DSC05664", "DSC06114", "DSC07850", "DSC07975", "DSC07994", "DSC08153", "DSC08167-2", "DSC08358", "DSC08718", "DSC08748", "DSC08760", "DSC08810", "DSC08821", "DSC09972", "DSC09975", "DSC09982"];
const architectureImages = ["DSC01436", "DSC01437", "DSC01441", "DSC03300", "DSC03382", "DSC03905", "DSC03959", "DSC04086", "DSC04087", "DSC04102", "DSC04119", "DSC04391", "DSC04662-2", "DSC05608", "DSC06114", "DSC08718", "DSC08810", "DSC08821", "DSC08823", "DSC09352", "DSC09908", "DSC09948", "DSC09958"];
const animalImages = ["DSC00327", "DSC00362", "DSC05863", "DSC05864", "DSC09528"];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true); 

  // 用 State 裝住隨機抽出嚟嘅封面路徑
  const [randomCovers, setRandomCovers] = useState({
    portrait: "/images/Portrait/DSC03064.jpg",
    landscape: "/images/Landscape/DSC08821.jpg",
    architecture: "/images/Architecture/DSC03905.jpg",
    animals: "/images/Animals/DSC05863.jpg"
  });

  // 喺 Client Side 掛載時，隨機洗牌
  useEffect(() => {
    const getRandomImg = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    setRandomCovers({
      portrait: `/images/Portrait/${getRandomImg(portraitImages)}.jpg`,
      landscape: `/images/Landscape/${getRandomImg(landscapeImages)}.jpg`,
      architecture: `/images/Architecture/${getRandomImg(architectureImages)}.jpg`,
      animals: `/images/Animals/${getRandomImg(animalImages)}.jpg`
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const target = e.target as HTMLElement;
    if (!navbar || !menuBtn) return;

    if (window.innerWidth <= 768) {
      const isActive = navbar.classList.contains('mobile-active');
      const isLogo = target.closest('.nav-logo');
      if (isLogo && !isActive) return;

      if (isActive) {
        navbar.classList.remove('mobile-active');
        menuBtn.classList.remove('open');
        document.body.style.overflow = ''; 
      } else {
        navbar.classList.remove('collapsed'); 
        navbar.classList.add('mobile-active');
        menuBtn.classList.add('open');
        document.body.style.overflow = 'hidden'; 
      }
    } else {
      navbar.classList.toggle('force-expand');
    }
  };

  useEffect(() => {
    if (isLoading) return;

    let lenis: any;
    import('@studio-freight/lenis').then((Lenis) => {
      lenis = new Lenis.default({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    const navbar = document.getElementById('navbar');
    const title = document.querySelector('.main-title') as HTMLElement;
    const subtitle = document.querySelector('.subtitle') as HTMLElement;
    const seamlessHero = document.getElementById('seamless-hero');
    const heroOverlay = document.getElementById('hero-overlay');
    const introText = document.getElementById('intro-text-container');
    const aboutTrack = document.getElementById('about-track');
    const overviewFixed = document.getElementById('overview-fixed');
    const contactBubble = document.getElementById('contact-bubble');
    const scrollPrompt = document.getElementById('scroll-prompt');

    if (title && !title.classList.contains('split-done')) {
      const text = title.textContent || '';
      title.innerHTML = text.replace(/\S/g, "<span class='char-span'>$&</span>");
      title.classList.add('split-done');
      const spans = title.querySelectorAll('.char-span');
      spans.forEach((span: any, idx) => {
        setTimeout(() => span.classList.add('visible'), 100 + (idx * 50));
      });
      setTimeout(() => subtitle?.classList.add('visible'), 800);
    }

    if (subtitle && !subtitle.classList.contains('split-done')) {
       const subText = subtitle.textContent || '';
       subtitle.innerHTML = subText.split('').map(char => `<span class="sub-char">${char}</span>`).join('');
       subtitle.classList.add('split-done');
    }

    const animateLoop = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 768;

      if (scrollY > 50) {
          if (navbar && !navbar.classList.contains('mobile-active')) navbar.classList.add('collapsed');
      } else {
        navbar?.classList.remove('collapsed');
        navbar?.classList.remove('force-expand');
      }

      // Scroll UI 只出現喺 Landing，碌落去就隱藏
      if (scrollPrompt) {
        if (scrollY > 50) scrollPrompt.classList.add('hide');
        else scrollPrompt.classList.remove('hide');
      }

      const scatterProgress = Math.min(scrollY / (windowHeight * 1.2), 1);
      if (introText) {
        introText.style.opacity = (1 - scatterProgress).toString();
        introText.style.transform = `translate(-50%, -50%)`;
      }

      const colorP = scatterProgress;
      const r = 244 + (255 - 244) * colorP;
      const g = 208 + (255 - 208) * colorP;
      const b = 63 + (255 - 63) * colorP;
      const colorString = `rgb(${r},${g},${b})`;

      if (title) title.style.color = colorString;
      if (subtitle) subtitle.style.color = colorString;

      const charSpans = document.querySelectorAll('.char-span, .sub-char');
      if (charSpans.length > 0) {
        charSpans.forEach((span: any, i) => {
          const randomAngle = (i * 137.5) % 360;
          const distance = scrollY * 2.5; 
          const x = Math.cos(randomAngle * Math.PI / 180) * distance;
          const y = Math.sin(randomAngle * Math.PI / 180) * distance;
          const rotation = scrollY * (i % 2 === 0 ? 0.2 : -0.2); 
          const blur = scrollY * 0.03; 

          span.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          span.style.filter = `blur(${blur}px)`;
          span.style.color = colorString;
          span.style.opacity = (1 - scatterProgress).toString();
        });
      }

      if (seamlessHero) {
          const cardFadeIn = Math.min(scrollY / 150, 1);
          seamlessHero.style.opacity = cardFadeIn.toString();
      }

      // 🟢 處理圖片拉大 (Full Screen) 同埋 Work Overview Fade In
      if (seamlessHero && aboutTrack) {
        const trackRect = aboutTrack.getBoundingClientRect();
        const totalDistance = trackRect.height - windowHeight;
        let progress = 0;
        
        if (trackRect.top <= 0) {
            progress = Math.abs(trackRect.top) / totalDistance;
        }
        progress = Math.max(0, Math.min(progress, 1));

        // 起始大細 (Card Size)
        const startW = isMobile ? windowWidth * 0.6 : Math.min(windowWidth * 0.25, 350);
        const startH = isMobile ? windowWidth * 0.8 : Math.min(windowWidth * 0.35, 500);

        // 🟢 目標大細 (Full Screen: 100vw x 100vh)
        const targetW = windowWidth;
        const targetH = windowHeight; 

        // Phase 1 (0 to 0.6): 圖片拉大到 Full Screen
        const expandP = Math.min(progress / 0.6, 1);
        
        // 確保可以用盡全螢幕
        const currentW = startW + (targetW - startW) * expandP;
        const currentH = startH + (targetH - startH) * expandP;
        const radius = 16 * (1 - expandP);

        seamlessHero.style.width = `${currentW}px`;
        seamlessHero.style.height = `${currentH}px`;
        seamlessHero.style.borderRadius = `${radius}px`;

        if (heroOverlay) {
            heroOverlay.style.opacity = (expandP * 0.6).toString();
        }

        // Phase 2 (0.6 to 1.0): 文字 Fade In
        if (overviewFixed) {
            const textP = Math.max(0, (progress - 0.6) / 0.4);
            overviewFixed.style.opacity = textP.toString();
            overviewFixed.style.transform = `translate(-50%, -50%) scale(${0.95 + 0.05 * textP})`;
        }
      }

      if (contactBubble) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) contactBubble.classList.add('expanded');
        else contactBubble.classList.remove('expanded');
      }

      updateTextWave();
      requestAnimationFrame(animateLoop);
    };

    const startAnim = requestAnimationFrame(animateLoop);
    return () => {
      cancelAnimationFrame(startAnim);
      if (lenis) lenis.destroy();
    };
  }, [isLoading]);

  function updateTextWave() {
    const textContainer = document.getElementById('lets-create-text');
    const contentWrapper = document.getElementById('contact-content-wrapper');
    if (!textContainer) return;
    
    if (textContainer.querySelectorAll('span').length === 0) {
        const text = textContainer.textContent || '';
        textContainer.textContent = '';
        text.split('').forEach(char => {
            const s = document.createElement('span');
            s.textContent = char === ' ' ? '\u00A0' : char;
            textContainer.appendChild(s);
        });
    }

    const rect = textContainer.getBoundingClientRect();
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    const start = window.innerHeight;
    const end = 0;
    let scrollPos = (start - rect.top) / (start - end);
    const wavePos = scrollPos * 1.5 - 0.2;
    const spans = textContainer.querySelectorAll('span');

    spans.forEach((span: any, index) => {
        if (isBottom) {
            span.style.color = '#fff';
            span.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            span.style.transform = 'scale(1)';
            contentWrapper?.classList.add('shift-layout');
            return;
        }
        contentWrapper?.classList.remove('shift-layout');
        const letterPos = index / (spans.length - 1);
        const diff = Math.abs(wavePos - letterPos);
        const width = 0.15;
        if (diff < width) {
            const intensity = 1 - (diff / width);
            span.style.color = `rgb(255, ${215 + (40 * (1 - intensity))}, ${0 + (255 * (1 - intensity))})`;
            span.style.textShadow = `0 0 ${20 * intensity}px rgba(244, 208, 63, ${0.8 * intensity})`;
            span.style.transform = `scale(${1 + (0.15 * intensity)}) translateY(-${5 * intensity}px)`;
        } else if (letterPos < wavePos - width) {
            span.style.color = '#fff';
            span.style.textShadow = 'none';
            span.style.transform = 'scale(1)';
        } else {
            span.style.color = '#333';
            span.style.textShadow = 'none';
            span.style.transform = 'scale(1)';
        }
    });
  }

  const portfolioData: any = {
    'portrait': { type: 'static', src: randomCovers.portrait },
    'landscape': { type: 'static', src: randomCovers.landscape },
    'architecture': { type: 'static', src: randomCovers.architecture },
    'animals': { type: 'static', src: randomCovers.animals },
    'video': { type: 'yt', id: 'oil1eYqmIXo' } 
  };

  const categories = [
    { id: 'portrait', label: 'Portrait' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'animals', label: 'Animals' },
    { id: 'video', label: 'Video' }
  ];

  return (
    <>
      {/* @ts-ignore */}
      <style jsx global>{`
        /* HTML/Body Setup */
        html, body { 
          background-color: #000 !important; 
          margin: 0; 
          padding: 0; 
          overflow-x: hidden;
        }

        .main-content-wrapper { 
          opacity: 0 !important; 
          visibility: hidden !important; 
          transition: opacity 1s ease-in-out, visibility 1s; 
        }
        .main-content-wrapper.loaded { 
          opacity: 1 !important; 
          visibility: visible !important; 
        }

        /* PERFORMANCE & RESET */
        * { box-sizing: border-box; }
        body { color: #fff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-image: radial-gradient(circle at 50% 30%, #1a1a1a 0%, #000000 70%); min-height: 100vh; }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-stopped { overflow: hidden; }
        
        .preloader { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: #000; z-index: 9999; transition: opacity 0.8s ease-in-out; pointer-events: none; display: flex; align-items: center; justify-content: center; }
        .preloader.hidden { opacity: 0; }
        .loader { width: 48px; height: 48px; border: 3px solid rgba(244, 208, 63, 0.2); border-radius: 50%; display: inline-block; position: relative; box-sizing: border-box; animation: rotation 1s linear infinite; }
        .loader::after { content: ''; box-sizing: border-box; position: absolute; left: 0; top: 0; background: #F4D03F; width: 12px; height: 12px; transform: translate(-50%, 50%); border-radius: 50%; }
        @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* NAVBAR & HERO */
        .smart-nav { position: fixed; top: 30px; left: 50%; transform: translateX(-50%); padding: 0 30px; display: flex; align-items: center; justify-content: space-between; z-index: 2000; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); width: auto; min-width: 450px; height: 60px; transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); overflow: hidden; cursor: pointer; }
        .nav-header { display: contents; }
        .nav-logo { font-weight: 900; letter-spacing: -1px; font-size: 18px; text-decoration: none; color: #fff; white-space: nowrap; margin-right: auto; cursor: pointer; order: 1; }
        .nav-links { display: flex; gap: 25px; align-items: center; overflow: hidden; transition: all 0.5s ease; opacity: 1; max-width: 900px; order: 2; margin: 0 40px; }
        .nav-item { text-decoration: none; color: #fff; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: color 0.3s ease; white-space: nowrap; position: relative; }
        .nav-item:hover, .nav-item.active { color: #F4D03F; }
        .menu-icon { width: 24px; height: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; cursor: pointer; pointer-events: none; z-index: 2005; order: 3; margin-left: 0; }
        .menu-line { width: 100%; height: 1px; background-color: #fff; transition: all 0.3s ease; transform-origin: center; }
        .menu-icon.open .menu-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .menu-icon.open .menu-line:nth-child(2) { opacity: 0; }
        .menu-icon.open .menu-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        @media (min-width: 769px) {
            .smart-nav:hover, .smart-nav.force-expand { min-width: 650px !important; background: rgba(255, 255, 255, 0.1) !important; padding: 0 30px !important; } 
            .smart-nav:hover .nav-links, .smart-nav.force-expand .nav-links { max-width: 900px !important; opacity: 1 !important; gap: 25px !important; pointer-events: auto !important; display: flex !important; } 
        }
        .smart-nav.collapsed { min-width: 150px; background: rgba(255, 255, 255, 0.05); padding: 0 20px; } 
        .smart-nav.collapsed .nav-links { max-width: 0; opacity: 0; gap: 0; pointer-events: none; } 
        .smart-nav.collapsed .nav-logo { margin-right: 10px; } 
        .smart-nav.collapsed .menu-icon { margin-left: 0; }

        .mobile-menu-overlay { display: none; }

        .intro-section { height: 100vh; width: 100%; position: relative; overflow: hidden; margin-bottom: 0; z-index: 10; }
        .intro-text { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 50; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; pointer-events: none; will-change: opacity, transform, color; }
        .main-title { font-size: 8vw; font-weight: 900; margin: 0 0 20px 0; letter-spacing: -2px; line-height: 1; color: #F4D03F; transition: color 0.1s linear; white-space: nowrap; }
        .subtitle { font-size: 1.5vw; font-weight: 400; line-height: 1.4; max-width: 800px; color: #F4D03F; opacity: 0; transform: translateY(20px); transition: all 1s ease; }
        .subtitle.visible { opacity: 1; transform: translateY(0); }
        .char-span, .sub-char { display: inline-block; will-change: transform, opacity, filter, color; }

        .scroll-prompt { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 100; pointer-events: none; opacity: 0.6; transition: opacity 0.3s ease; }
        .scroll-prompt.hide { opacity: 0; }
        
        .credit-text {
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            margin-bottom: 20px;
            text-align: center;
        }

        .scroll-text { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.4); text-transform: uppercase; }
        .scroll-line { width: 1px; height: 40px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
        .scroll-line::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, #fff, transparent); transform: translateY(-100%); animation: scrollFlow 2s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
        @keyframes scrollFlow { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

        .seamless-hero { 
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
          width: 25vw; height: 35vw; 
          border-radius: 16px; z-index: 5; overflow: hidden; 
          box-shadow: 0 30px 60px rgba(0,0,0,0.6); 
          will-change: width, height, border-radius; 
        }
        .main-content-wrapper.loaded .seamless-hero { visibility: visible; }

        .hero-inner-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: none; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 3; opacity: 0; pointer-events: none; }
        
        .about-track { height: 200vh; position: relative; z-index: 10; }

        /* 🟢 固定位置嘅 Work Overview，等住 Fade In */
        .overview-fixed { 
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 100vw; height: auto; 
            z-index: 20; pointer-events: none; opacity: 0;
            display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        .overview-title { font-size: 6vw; font-weight: 800; letter-spacing: -1px; margin-bottom: 15px; color: #fff; line-height: 1; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .overview-subtitle { font-size: 1.1rem; color: #ddd; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        
        .gallery-wrapper { position: relative; width: 100%; z-index: 200; background: #050505; box-shadow: 0 -50px 100px rgba(0,0,0,1); }
        .hero-section { width: 100%; height: 70vh; position: relative; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; background: #050505; cursor: pointer; }
        .hero-img-wrapper { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
        
        .hero-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s ease, filter 0.5s ease, opacity 0.5s ease; }
        .hero-img.static-thumb { opacity: 0.95; transform: scale(1); filter: grayscale(20%); }
        .hero-section:hover .hero-img.static-thumb { opacity: 1; transform: scale(1.05); filter: grayscale(0%); }
        
        .hero-category-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 8vw; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; color: #fff; text-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20; pointer-events: none; text-align: center; width: 100%; opacity: 1; transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .hero-section:hover .hero-category-label { opacity: 0; }

        .yt-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
        
        .contact-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 30; width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 0; transition: gap 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
        .contact-content.shift-layout { gap: 50px; }
        .contact-title { font-size: 80px; font-weight: 900; color: #333; margin: 0; letter-spacing: -2px; display: inline-block; white-space: nowrap; }
        #lets-create-text span { display: inline-block; color: #333; transition: color 0.2s ease-out, text-shadow 0.2s ease-out, transform 0.2s ease-out; will-change: color, transform; }
        .vertical-line { width: 1px; height: 0; background-color: rgba(255, 255, 255, 0.4); margin: 0; opacity: 0; transition: height 0.6s cubic-bezier(0.22, 1, 0.36, 1), margin 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease; }
        .contact-content.shift-layout .vertical-line { height: 80px; margin: 0 40px; opacity: 1; transition-delay: 0.4s; }
        .qr-container { width: 0; opacity: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; transform: translateX(-50px); transition: all 0.5s ease; }
        .contact-content.shift-layout .qr-container { width: 100px; opacity: 1; transform: translateX(0); transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, opacity 0.8s ease 0.9s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.9s; }
        .qr-code-img { width: 100px; min-width: 100px; height: auto; display: block; border-radius: 8px; }
        
        .contact-widget { position: fixed; bottom: 30px; right: 30px; z-index: 2500; display: flex; align-items: center; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.15); border-radius: 50px; padding: 6px; width: auto; max-width: 52px; height: 52px; box-sizing: border-box; overflow: hidden; transition: max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, box-shadow 0.3s ease, padding-right 0.6s ease; }
        .contact-widget:hover, .contact-widget.expanded { max-width: 380px; padding-right: 25px; background: rgba(255, 255, 255, 0.15); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .contact-widget:hover .contact-details, .contact-widget.expanded .contact-details { opacity: 1; margin-left: 15px; pointer-events: auto; }
        
        .contact-icon { width: 38px; height: 38px; background: #fff; color: #000; border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0; }
        
        .contact-details { opacity: 0; white-space: nowrap; margin-left: 0; display: flex; flex-direction: column; justify-content: center; gap: 4px; pointer-events: none; transition: opacity 0.3s ease 0.1s, margin-left 0.4s ease; }
        
        .contact-link { color: #ccc; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 1px; display: flex; align-items: center; transition: all 0.3s; }
        .contact-link:hover { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.6); }
        
        .contact-link span.label { font-size: 9px; text-transform: uppercase; color: #F4D03F; margin-right: 10px; width: 60px; font-weight: 700; }

        @media (max-width: 768px) {
            .hero-category-label { opacity: 1 !important; transform: translate(-50%, -50%) !important; color: #fff; }
            .smart-nav { flex-direction: column !important; align-items: flex-start !important; width: 90% !important; max-width: 350px !important; height: 60px; overflow: hidden; transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); min-width: 0 !important; }
            .smart-nav.mobile-active { position: fixed !important; top: 0 !important; left: 0 !important; transform: none !important; width: 100vw !important; max-width: none !important; height: 100vh !important; border-radius: 0 !important; background: #000 !important; border: none !important; padding: 30px !important; justify-content: flex-start !important; align-items: center !important; z-index: 9000 !important; }
            .nav-header { display: flex !important; width: 100%; justify-content: space-between; align-items: center; height: 60px; flex-shrink: 0; }
            .nav-logo { order: unset; margin-right: 0; }
            .menu-icon { order: unset; }
            .nav-links { display: flex !important; flex-direction: column !important; width: 100% !important; opacity: 0; transform: translateY(20px); transition: all 0.4s ease 0.1s; pointer-events: none; margin-top: 0; height: 100%; justify-content: center; align-items: center; gap: 40px !important; order: unset; margin: 0; }
            .smart-nav.mobile-active .nav-links { opacity: 1 !important; transform: translateY(0) !important; pointer-events: auto !important; visibility: visible !important; }
            .nav-item { font-size: 28px !important; font-weight: 700 !important; letter-spacing: 2px !important; }
            
            .main-title { font-size: 13vw; }
            .subtitle { font-size: 16px; padding: 0 20px; }
            .intro-text { position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 100% !important; padding: 0 20px; }

            .credit-text {
                font-size: 9px;
                margin-bottom: 15px;
            }
            
            .contact-content { flex-direction: column !important; gap: 30px; }
            .contact-content.shift-layout { gap: 40px; transform: translate(-50%, -60%); }
            .contact-title { font-size: 15vw; white-space: normal; text-align: center; }
            .vertical-line { width: 1px; height: 40px !important; margin: 20px 0 !important; }
            .contact-content.shift-layout .vertical-line { height: 60px !important; }
            .qr-container { transform: translateY(20px); }
            .contact-content.shift-layout .qr-container { width: 150px; transform: translateY(0); }
            
            .overview-title { font-size: 12vw; }
        }
      `}</style>

      {/* Preloader */}
      <div className={`preloader ${!isLoading ? 'hidden' : ''}`}>
          <span className="loader"></span>
      </div>

      <div className={`main-content-wrapper ${!isLoading ? 'loaded' : ''}`}>
          
          <nav className="smart-nav" id="navbar" onClick={toggleMenu}>
            <div className="nav-header">
                <Link href="/" className="nav-logo">SAM CHOW.</Link>
                <div className="menu-icon" id="menu-btn">
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                </div>
            </div>
            <div className="nav-links">
              <Link href="/portrait" className="nav-item">Portrait</Link>
              <Link href="/landscape" className="nav-item">Landscape</Link>
              <Link href="/architecture" className="nav-item">Architecture</Link>
              <Link href="/animals" className="nav-item">Animals</Link>
              <Link href="/video" className="nav-item">Video</Link>
            </div>
          </nav>

          <div className="seamless-hero" id="seamless-hero">
            {/* 🟢 SAM CHOW 片頭 — 自動播片背景 */}
            <div className="hero-inner-video" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/oil1eYqmIXo?autoplay=1&mute=1&controls=0&loop=1&playlist=oil1eYqmIXo&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="SAM CHOW Intro"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '56.25vw', minWidth: '177.78vh', minHeight: '100vh', pointerEvents: 'none', border: 'none' }}
              ></iframe>
            </div>
            <div className="hero-overlay" id="hero-overlay"></div>
          </div>

          <div className="intro-section" id="intro-trigger">
            <div className="intro-text" id="intro-text-container">
              <h1 className="main-title">SAM CHOW.</h1>
              <div className="subtitle">My Photography Gallery</div>
            </div>
            
            <div className="scroll-prompt" id="scroll-prompt">
              <div className="credit-text">Website Designed & Developed by Sam Chow</div>
              <div className="scroll-text">SCROLL</div>
              <div className="scroll-line"></div>
            </div>
          </div>

          {/* 🟢 空軌道，用嚟觸發 Scroll 動畫：拉大圖片 -> Fade in 文字 */}
          <div className="about-track" id="about-track"></div>

          {/* 🟢 固定位置嘅 Work Overview 文字框，唔會向上推，只會 Fade in */}
          <div className="overview-fixed" id="overview-fixed">
            <div className="overview-title" id="overview-title">WORK OVERVIEW</div>
            <div className="overview-subtitle" id="overview-subtitle">Select a category to explore details</div>
          </div>

          <div className="gallery-wrapper" id="gallery-container">
            {categories.map((cat) => {
              const data = portfolioData[cat.id];
              return (
                <Link key={cat.id} href={`/${cat.id}`}>
                    <div 
                        className="hero-section"
                    >
                    <div className="hero-img-wrapper">
                        {data?.type === 'yt' ? (
                            <div className="yt-container" style={{ width: '100%', height: '100%' }}>
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${data.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.id}&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></iframe>
                            </div>
                        ) : data?.type === 'local_vid' ? (
                            <video 
                                src={data.src} 
                                className="hero-img static-thumb" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                            />
                        ) : (
                            <img src={data?.src || '/images/placeholder.jpg'} className="hero-img static-thumb" alt={`${cat.label} Cover`} />
                        )}
                    </div>
                    <div className="hero-category-label">{cat.label}</div>
                    </div>
                </Link>
              );
            })}

            <div className="hero-section" id="contact-section" style={{ background: '#080808', cursor: 'default' }}>
                <div className="hero-img-wrapper">
                    <img src="/images/contact_bg.jpg" className="hero-img" style={{ filter: 'grayscale(100%) brightness(0.4)', opacity: 0.3 }} alt="Contact BG" />
                </div>
                <div className="contact-content" id="contact-content-wrapper">
                    <div className="contact-title" id="lets-create-text">Let's Create.</div>
                    <div className="vertical-line"></div>
                    <div className="qr-container" id="qr-target">
                        <img src="/ig-qrcode.png" alt="Instagram QR Code" className="qr-code-img" />
                    </div>
                </div>
            </div>
          </div>

          <div className="contact-widget" id="contact-bubble">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div className="contact-details">
                <a href="https://wa.me/85267012420" target="_blank" className="contact-link"><span className="label">WHATSAPP</span>6701 2420</a>
                <a href="mailto:chowfh254281@gmail.com" className="contact-link"><span className="label">MAIL</span>chowfh254281@gmail.com</a>
            </div>
          </div>

      </div>
    </>
  );
}