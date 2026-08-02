import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  BrainCircuit, 
  Database, 
  FileSpreadsheet, 
  Terminal, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Copy, 
  Check, 
  PieChart, 
  LineChart, 
  Sliders, 
  Eye, 
  X, 
  Menu, 
  Globe, 
  Layers, 
  Cpu, 
  Zap, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  BookOpen,
  School,
  Send,
  Loader2
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import confetti from 'canvas-confetti';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend);

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [copiedField, setCopiedField] = useState(null);
  
  // Modal States
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Interactive Chart Sandbox State
  const [chartType, setChartType] = useState('sales');

  // Dynamic Typewriter Effect for Roles
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    'Fresher Data Analyst',
    'Business Intelligence Pro (Power BI)',
    'Machine Learning Practitioner',
    'SAP ABAP Developer'
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Canvas Constellation Animation Background
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Copy helper
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Direct Contact Form Submission using Web3Forms API
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      // Send form data to Web3Forms API directly
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b947c617-640c-4573-b269-8fa9352e85ef', // Web3Forms Access Key configured for aritrab16118@gmail.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Aritra Banerjee Portfolio Contact'
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setIsSubmitting(false);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        // Fallback: Trigger direct mailto link if API key is unverified
        window.location.href = `mailto:aritrab16118@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        setFormSubmitted(true);
        setIsSubmitting(false);
      }
    } catch (err) {
      // Direct mailto fallback on network error
      window.location.href = `mailto:aritrab16118@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      setFormSubmitted(true);
      setIsSubmitting(false);
    }
  };

  // Data for Projects
  const projectsData = [
    {
      id: 1,
      title: 'Sales & Nutrition Analytics Dashboard',
      category: 'analytics',
      tech: ['Power BI', 'SQL', 'Power Query', 'DAX'],
      image: '/assets/project_sales.jpg',
      summary: 'Interactive Power BI dashboard analyzing 200+ beverage products across 13+ nutritional attributes to discover key trends.',
      highlights: [
        'Analyzed 200+ beverage products across 13+ nutritional attributes',
        'Transformed raw datasets using Power Query & DAX for dynamic visualizations',
        'Delivered KPI-driven dashboards that reduced manual reporting effort'
      ],
      github: 'https://github.com/AritraBanerjee-09/Sales-Nutrition-Analytics-Dashboard',
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />
    },
    {
      id: 2,
      title: 'AI Travel Planning System',
      category: 'ai',
      tech: ['Python', 'AI/LLM', 'LangChain', 'FastAPI'],
      image: '/assets/project_travel.jpg',
      summary: 'Intelligent multi-agent travel planner creating personalized itineraries based on user constraints and preferences.',
      highlights: [
        'Automated itinerary generation combining budget, location, and constraints',
        'Utilized LangChain and custom AI workflows for dynamic recommendations',
        'Integrated interactive web interface for real-time user query resolution'
      ],
      github: 'https://github.com/AritraBanerjee-09/AI-Travel-Planning-System',
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />
    },
    {
      id: 3,
      title: 'Customer Churn Prediction',
      category: 'ai',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'EDA'],
      image: '/assets/project_churn.jpg',
      summary: 'End-to-end Machine Learning pipeline predicting customer churn risks to assist business retention strategies.',
      highlights: [
        'Performed thorough Exploratory Data Analysis & Feature Engineering',
        'Trained and validated classification algorithms to spot churn indicators',
        'Generated actionable recommendations to boost customer retention metrics'
      ],
      github: 'https://github.com/AritraBanerjee-09/Customer-Churn-Prediction',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 4,
      title: 'Vendor Performance Analysis (PowerBI)',
      category: 'analytics',
      tech: ['Power BI', 'DAX', 'Data Modeling', 'Supply Chain Analytics'],
      image: '/assets/project_sales.jpg',
      summary: 'BI dashboard evaluating vendor delivery timelines, defect rates, and cost efficiencies for enterprise purchasing.',
      highlights: [
        'Constructed star-schema data models to correlate supplier metrics',
        'Designed custom DAX measures for SLA tracking and performance scoring',
        'Enhanced visibility into vendor reliability for procurement teams'
      ],
      github: 'https://github.com/AritraBanerjee-09/Vendor-Performace-Analysis-Using-PowerBI',
      icon: <Layers className="w-5 h-5 text-blue-400" />
    },
    {
      id: 5,
      title: 'Credit Card Fraud Detection',
      category: 'ai',
      tech: ['Python', 'Scikit-learn', 'Random Forest', 'NumPy'],
      image: '/assets/project_fraud.jpg',
      summary: 'ML classification pipeline detecting fraudulent financial transactions on highly imbalanced financial datasets.',
      highlights: [
        'Optimized model performance by 15% and reduced false positives by 16%',
        'Achieved 87% precision using Random Forest, cross-validation & tuning',
        'Handled extreme class imbalance with specialized resampling techniques'
      ],
      github: 'https://github.com/AritraBanerjee-09',
      icon: <Zap className="w-5 h-5 text-yellow-400" />
    },
    {
      id: 6,
      title: 'Personal Agentic AI Chatbot',
      category: 'ai',
      tech: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Streamlit'],
      image: '/assets/project_chatbot.jpg',
      summary: 'Multi-agent AI assistant integrating RAG, conversational memory, and live web search for context-aware responses.',
      highlights: [
        'Architected multi-agent chatbot combining RAG and real-time web search',
        'Scalable FastAPI & LangGraph backend for intelligent agent routing',
        'Extensible modular architecture allowing rapid LLM model integration'
      ],
      github: 'https://github.com/AritraBanerjee-09',
      icon: <Cpu className="w-5 h-5 text-rose-400" />
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeTab);

  // Skill sets
  const skillsList = [
    { name: 'Python (Pandas, NumPy, EDA)', category: 'analytics', level: 92, icon: <Terminal className="w-4 h-4 text-yellow-400" /> },
    { name: 'SQL (MySQL, CTEs, Window Functions)', category: 'analytics', level: 90, icon: <Database className="w-4 h-4 text-cyan-400" /> },
    { name: 'Power BI & DAX Modeling', category: 'bi', level: 94, icon: <BarChart3 className="w-4 h-4 text-amber-400" /> },
    { name: 'Power Query & ETL Pipelines', category: 'analytics', level: 88, icon: <Layers className="w-4 h-4 text-blue-400" /> },
    { name: 'Advanced Excel (Pivot, XLOOKUP)', category: 'bi', level: 90, icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
    { name: 'Machine Learning (Scikit-learn)', category: 'ml', level: 85, icon: <BrainCircuit className="w-4 h-4 text-purple-400" /> },
    { name: 'SAP ABAP & SAP MM Modules', category: 'enterprise', level: 86, icon: <Cpu className="w-4 h-4 text-rose-400" /> },
    { name: 'Data Storytelling & KPI Reporting', category: 'bi', level: 92, icon: <PieChart className="w-4 h-4 text-cyan-300" /> }
  ];

  const filteredSkills = activeSkillCategory === 'all'
    ? skillsList
    : skillsList.filter(s => s.category === activeSkillCategory);

  // Certificates list with links
  const certificatesData = [
    {
      title: 'SAP ABAP Internship Certificate',
      issuer: 'Exide Industries Ltd.',
      link: 'https://drive.google.com/file/d/1Z6vkSAFzl6adYguggvwBxspbrx6CcDjy/view?usp=drive_link',
      date: 'Professional Internship',
      badge: 'Verified Industry'
    },
    {
      title: 'Data Analytics Professional Certificate',
      issuer: 'IBM',
      link: 'https://drive.google.com/file/d/1F2dMrelcTvmFe7dRMnVo3sFumio2qYm0/view?usp=drive_link',
      date: 'IBM Certified',
      badge: 'Data Science'
    },
    {
      title: 'Data Analytics Job Simulation Certificate',
      issuer: 'Deloitte',
      link: 'https://drive.google.com/file/d/15PJkGBNufAVUrBEtTzXtPrTmj3W7OlxC/view?usp=drive_link',
      date: 'Deloitte Virtual Experience',
      badge: 'Business Intelligence'
    },
    {
      title: 'Programming in Python',
      issuer: 'Meta',
      link: '#',
      date: 'Meta Verified',
      badge: 'Software Engineering'
    },
    {
      title: 'Foundations: Data, Data, Everywhere',
      issuer: 'Google',
      link: '#',
      date: 'Google Career',
      badge: 'Analytics Fundamentals'
    }
  ];

  // Chart Sandbox Data
  const chartConfigs = {
    sales: {
      labels: ['Caloric Content', 'Sugar (g)', 'Sodium (mg)', 'Caffeine (mg)', 'Carbs (g)', 'Protein (g)'],
      datasets: [{
        label: 'Average Nutritional Value per Category',
        data: [140, 28, 45, 35, 32, 4],
        backgroundColor: 'rgba(6, 182, 212, 0.6)',
        borderColor: '#06b6d4',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    fraud: {
      labels: ['Baseline Logistic', 'Decision Tree', 'Random Forest (Tuned)', 'XGBoost'],
      datasets: [
        {
          label: 'Precision (%)',
          data: [72, 78, 87, 89],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.3
        },
        {
          label: 'False Positive Reduction (%)',
          data: [5, 10, 16, 18],
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          tension: 0.3
        }
      ]
    },
    abap: {
      labels: ['Bulk Purchase Upload', 'Inventory Audit', 'Financial Ledger Batch', 'Vendor Reconciliation'],
      datasets: [
        {
          label: 'Before Optimization (Mins)',
          data: [25, 30, 20, 28],
          backgroundColor: 'rgba(244, 63, 94, 0.6)',
          borderRadius: 6
        },
        {
          label: 'After SAP ABAP Automation (Mins)',
          data: [4.5, 5, 3.8, 4.2],
          backgroundColor: 'rgba(34, 211, 238, 0.8)',
          borderRadius: 6
        }
      ]
    }
  };

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Background particle canvas & glowing ambient elements */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="bg-grid-overlay" />
      <div className="bg-ambient-blur ambient-1" />
      <div className="bg-ambient-blur ambient-2" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group text-decoration-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              AB
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Aritra Banerjee
              </span>
              <span className="block text-xs text-slate-400 font-mono">Data & BI Specialist</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">About & Skills</a>
            <a href="#education" className="text-slate-300 hover:text-cyan-400 transition-colors">Education</a>
            <a href="#experience" className="text-slate-300 hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#sandbox" className="text-slate-300 hover:text-cyan-400 transition-colors">Analytics Sandbox</a>
            <a href="#certifications" className="text-slate-300 hover:text-cyan-400 transition-colors">Certificates</a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://www.linkedin.com/in/aritra-banerjee-/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/AritraBanerjee-09" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setShowResumeModal(true)}
              className="btn-primary py-2 px-4 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" /> View Resume
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex flex-col gap-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">About & Skills</a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Education</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Experience</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Projects</a>
            <a href="#sandbox" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Analytics Sandbox</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Certificates</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-cyan-400">Contact</a>
            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <a 
                href="https://www.linkedin.com/in/aritra-banerjee-/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 text-xs font-semibold rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-center flex items-center justify-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <button 
                onClick={() => { setShowResumeModal(true); setMobileMenuOpen(false); }}
                className="flex-1 btn-primary py-2 text-xs justify-center"
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-28">
        {/* HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Entry-Level & Fresher Opportunities</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Aspiring <br />
                <span className="text-gradient">Data Analyst & BI Specialist</span>
              </h1>

              <div className="h-8 font-mono text-lg text-cyan-300 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>I am a </span>
                <span className="underline decoration-cyan-500 decoration-2 underline-offset-4 font-semibold">
                  {roles[currentRoleIndex]}
                </span>
              </div>

              <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
                I am a passionate <strong className="text-white">Fresher</strong> actively looking for full-time opportunities in <strong className="text-cyan-300">Data Analytics, Business Intelligence, Machine Learning</strong>, and <strong className="text-cyan-300">SAP ABAP Development</strong>. Proficient in Python, SQL, Power BI, DAX, Scikit-learn, and enterprise process automation.
              </p>

              {/* Quick Action CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#projects" className="btn-primary">
                  <BarChart3 className="w-4 h-4" /> Explore Projects <ChevronRight className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/aritra-banerjee-/" target="_blank" rel="noreferrer" className="btn-secondary">
                  <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn Profile
                </a>
                <button 
                  onClick={() => setShowResumeModal(true)}
                  className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
                >
                  <Eye className="w-4 h-4 text-cyan-400" /> Resume PDF
                </button>
              </div>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="stat-box">
                  <div className="number">500+</div>
                  <div className="label">Records / Upload</div>
                </div>
                <div className="stat-box">
                  <div className="number">~60%</div>
                  <div className="label">Report Speedup</div>
                </div>
                <div className="stat-box">
                  <div className="number">87%</div>
                  <div className="label">ML Fraud Precision</div>
                </div>
                <div className="stat-box">
                  <div className="number">200+</div>
                  <div className="label">Products Analyzed</div>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Formal Suit Photo frame */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 p-2 shadow-2xl">
                  <img 
                    src="/aritra_photo.jpg" 
                    alt="Aritra Banerjee" 
                    className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl object-cover object-center grayscale-0 group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-card backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Aritra Banerjee</h4>
                      <p className="text-xs text-slate-400">KIIT University '26 • B.Tech ECS</p>
                    </div>
                    <span className="badge badge-emerald">CGPA 7.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILL MATRIX SECTION */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Technical Capabilities</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Skill Matrix & Competencies</h2>
            </div>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {[
                { id: 'all', label: 'All Skills' },
                { id: 'analytics', label: 'Data & SQL' },
                { id: 'bi', label: 'BI & Excel' },
                { id: 'ml', label: 'Machine Learning' },
                { id: 'enterprise', label: 'SAP & Enterprise' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeSkillCategory === cat.id
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, idx) => (
              <div key={idx} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      {skill.icon}
                    </div>
                    <span className="font-semibold text-slate-200 text-sm md:text-base">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Academic Background</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Education Timeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* B.Tech */}
            <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-cyan-500">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-emerald">2022 – 2026</span>
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Bachelor of Technology (B.Tech)</h3>
                <p className="text-cyan-400 font-semibold text-sm mb-2">Electronics & Computer Science Engineering</p>
                <p className="text-slate-300 text-xs font-mono mb-4">KIIT University, Bhubaneswar</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Graduation Year: 2026</span>
                <span className="font-bold font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 text-xs">
                  CGPA: 7.5
                </span>
              </div>
            </div>

            {/* Class 12 */}
            <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-indigo-500">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-purple">Class 12 (Higher Secondary)</span>
                  <BookOpen className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Senior Secondary Education</h3>
                <p className="text-indigo-300 font-semibold text-sm mb-2">Science Stream (Physics, Chemistry, Math)</p>
                <p className="text-slate-300 text-xs font-mono mb-4">DAV Public School</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Stream: PCM</span>
                <span className="font-bold font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 text-xs">
                  Percentage: 65%
                </span>
              </div>
            </div>

            {/* Class 10 */}
            <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-emerald-500">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-emerald">Class 10 (Secondary)</span>
                  <School className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Secondary Education</h3>
                <p className="text-emerald-300 font-semibold text-sm mb-2">General Curriculum</p>
                <p className="text-slate-300 text-xs font-mono mb-4">DAV Public School</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Standard 10th</span>
                <span className="font-bold font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-xs">
                  Percentage: 80%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE TIMELINE */}
        <section id="experience" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Industry Experience</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Professional Internship</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative pl-8 border-l-2 border-slate-800 space-y-8">
              {/* Experience Node */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950 shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform"></div>

                <div className="glass-card overflow-hidden space-y-4">
                  {/* Internship Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                    <img 
                      src="/assets/sap_abap_internship.jpg" 
                      alt="SAP ABAP Internship Exide Industries" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span className="badge badge-purple mb-1">Corporate Internship</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">Software Development Intern (SAP ABAP)</h3>
                      <div className="text-cyan-400 font-semibold text-sm">Exide Industries Ltd., Kolkata</div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-2 space-y-4">
                    <div className="flex justify-end">
                      <a 
                        href="https://drive.google.com/file/d/1Z6vkSAFzl6adYguggvwBxspbrx6CcDjy/view?usp=drive_link" 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-cyan-400" /> View Certificate <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>Engineered and automated <strong>6+ SAP ABAP applications</strong> to streamline procurement workflows, significantly reducing manual operational overhead across purchasing and inventory.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>Designed & optimized bulk data processing modules, <strong>reducing report generation time by ~60%</strong> and handling <strong>500+ records per upload</strong> for finance teams.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>Translated business requirements into scalable SAP solutions, reducing bulk transaction processing times from <strong>20–30 minutes to under 5 minutes</strong>.</span>
                      </li>
                    </ul>

                    {/* Tech Tags */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {['SAP ABAP', 'SAP MM', 'ALV Grid', 'BAPIs', 'Module Pool Programming', 'SE38', 'SE11', 'SE37'].map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SHOWCASE */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Portfolio Showcase</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
            </div>
            {/* Category Filter */}
            <div className="flex gap-2 mt-4 md:mt-0">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'analytics', label: 'Data & BI' },
                { id: 'ai', label: 'ML & AI Systems' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass-card overflow-hidden group flex flex-col justify-between">
                <div>
                  {/* Project Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3 p-2 rounded-lg glass-card backdrop-blur-md border border-white/10">
                      {project.icon}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-xs md:text-sm mb-4 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/90 text-cyan-300 font-mono text-[11px] border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      GitHub Link <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE ANALYTICS SANDBOX */}
        <section id="sandbox" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="glass-card p-6 md:p-10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <span className="badge badge-emerald mb-2">Live Demonstration</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Interactive Analytics Sandbox</h2>
                <p className="text-slate-400 text-sm mt-1">Explore live data visualizer models representing Aritra's analytics & optimization achievements.</p>
              </div>

              {/* Chart selector tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setChartType('sales')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    chartType === 'sales' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Nutrition Analytics
                </button>
                <button
                  onClick={() => setChartType('fraud')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    chartType === 'fraud' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Fraud ML Model Benchmark
                </button>
                <button
                  onClick={() => setChartType('abap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    chartType === 'abap' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  SAP ABAP Speedup
                </button>
              </div>
            </div>

            {/* Rendered Chart */}
            <div className="bg-slate-950/80 p-4 md:p-6 rounded-2xl border border-slate-800 h-[320px] md:h-[400px] flex items-center justify-center">
              {chartType === 'sales' && (
                <Bar 
                  data={chartConfigs.sales} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } }
                    },
                    scales: {
                      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                  }} 
                />
              )}

              {chartType === 'fraud' && (
                <Line 
                  data={chartConfigs.fraud} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } }
                    },
                    scales: {
                      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                  }} 
                />
              )}

              {chartType === 'abap' && (
                <Bar 
                  data={chartConfigs.abap} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } }
                    },
                    scales: {
                      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                  }} 
                />
              )}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS VAULT */}
        <section id="certifications" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Verified Credentials</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Certifications & Diplomas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificatesData.map((cert, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-purple">{cert.badge}</span>
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{cert.title}</h3>
                  <p className="text-cyan-400 font-medium text-xs mb-3">{cert.issuer}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{cert.date}</span>
                  {cert.link !== '#' ? (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 flex items-center gap-1 transition-colors"
                    >
                      View Link <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Verified Credential</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Get In Touch</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Let's Connect</h2>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  I am a motivated fresher actively looking for full-time entry-level opportunities and graduate roles in Data Analytics, Business Intelligence, Machine Learning, and SAP ABAP development.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Email Address</div>
                      <div className="font-mono text-sm text-slate-200 font-semibold">aritrab16118@gmail.com</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('aritrab16118@gmail.com', 'email')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Phone Number</div>
                      <div className="font-mono text-sm text-slate-200 font-semibold">+91 9523097561</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('9523097561', 'phone')}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">LinkedIn Profile</div>
                      <div className="font-mono text-sm text-slate-200 font-semibold">linkedin.com/in/aritra-banerjee-/</div>
                    </div>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/aritra-banerjee-/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">GitHub Profile</div>
                      <div className="font-mono text-sm text-slate-200 font-semibold">github.com/AritraBanerjee-09</div>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/AritraBanerjee-09" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-cyan-400" /> Send a Direct Message
                </h3>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out! Your message has been routed to <strong>aritrab16118@gmail.com</strong>. Aritra Banerjee will reply to you as soon as possible.
                    </p>
                    <button 
                      onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                      className="btn-secondary py-2 text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">YOUR NAME</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">YOUR EMAIL</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">SUBJECT</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Entry-Level Data Analyst Role / Interview Inquiry" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">MESSAGE</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Aritra, I saw your portfolio and would like to connect regarding..." 
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center py-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Direct Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 relative z-10 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            © {new Date().getFullYear()} Aritra Banerjee. Built with React & Vite.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/aritra-banerjee-/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/AritraBanerjee-09" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:aritrab16118@gmail.com" className="text-slate-400 hover:text-cyan-400" title="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="glass-card max-w-2xl w-full p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 rounded-xl overflow-hidden bg-slate-900">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                {selectedProject.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                <span className="badge badge-purple">{selectedProject.category.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.summary}</p>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">Key Achievements & Features</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary py-2 text-xs"
              >
                Open GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* RESUME VIEWER MODAL */}
      {showResumeModal && (
        <div className="modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Curriculum Vitae — Aritra Banerjee</h2>
              <p className="text-xs text-cyan-400 font-mono mt-1">Aspiring Data Analyst | BI & ML Practitioner (Fresher)</p>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2">Professional Summary</h3>
                <p className="text-slate-300 leading-relaxed text-xs md:text-sm">
                  Aspiring Data Analyst and passionate Fresher with hands-on experience in Data Analytics, Business Intelligence, Machine Learning, and enterprise process automation through academic and industry projects. Proficient in Python, SQL, Power BI, Excel, and Scikit-learn.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2">Education Timeline</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-start bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white">Bachelor of Technology (B.Tech) - Electronics & Computer Science Engineering</h4>
                      <p className="text-xs text-slate-400">KIIT University, Bhubaneswar</p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-emerald-400 font-bold">CGPA: 7.5</span>
                      <div className="text-slate-400">2022 – 2026</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white">Class 12 (Higher Secondary - Senior Secondary)</h4>
                      <p className="text-xs text-slate-400">DAV Public School</p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-indigo-400 font-bold">65% (PCM)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div>
                      <h4 className="font-bold text-white">Class 10 (Secondary)</h4>
                      <p className="text-xs text-slate-400">DAV Public School</p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-emerald-400 font-bold">80%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-2">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-200">Programming:</strong> Python, SQL (MySQL), Joins, CTEs, Window Functions
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-200">Data Analytics:</strong> Pandas, NumPy, Data Cleaning, Data Wrangling, ETL, EDA
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-200">Business Intelligence:</strong> Power BI, DAX, Power Query, Data Modeling, KPI Dashboards
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-200">Machine Learning:</strong> Scikit-Learn, Logistic Regression, Random Forest, Predictive Modeling
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button onClick={() => window.print()} className="btn-primary py-2 text-xs">
                <Download className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
