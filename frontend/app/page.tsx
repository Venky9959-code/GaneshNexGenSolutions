"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Code2, 
  Globe, Zap, Bot, LayoutGrid, Database, Smartphone, Lock, 
  ChevronDown, HelpCircle, Building2, Store, ShoppingBag, 
  GraduationCap, Stethoscope, Utensils, Home, Compass, Briefcase
} from "lucide-react";
import InteractiveProposalCalculator from "@/components/InteractiveProposalCalculator";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trustBadges = [
    "End-to-End Solutions",
    "Modern Technology",
    "Transparent Process",
    "Scalable Architecture",
    "Reliable Support"
  ];

  const services = [
    { num: "01", title: "Website Development", desc: "Business websites, corporate portals, landing pages, portfolios and high-performance digital experiences.", href: "/services/web-development" },
    { num: "02", title: "E-Commerce Development", desc: "Secure, scalable online stores with product, order and payment management.", href: "/services/ecommerce-development" },
    { num: "03", title: "Custom Software Development", desc: "Business applications tailored around specific workflows and operational requirements.", href: "/services/custom-software" },
    { num: "04", title: "UI/UX Design", desc: "Modern interfaces designed around usability, accessibility and conversion.", href: "/services/ui-ux-design" },
    { num: "05", title: "AI & Automation", desc: "AI assistants, workflow automation and intelligent business integrations.", href: "/services/ai-automation" },
    { num: "06", title: "Startup Solutions", desc: "From idea validation and digital strategy to product launch and MVP development.", href: "/services/startup-solutions" },
    { num: "07", title: "Cloud & Deployment", desc: "Deployment, domains, hosting, SSL, cloud infrastructure and performance optimization.", href: "/services/cloud-deployment" },
    { num: "08", title: "Website Maintenance", desc: "Security, monitoring, backups, upgrades and continuous improvement.", href: "/services/maintenance" }
  ];

  const processSteps = [
    { step: "01", title: "Discover", desc: "Understand business, audience, requirements and objectives." },
    { step: "02", title: "Plan", desc: "Define scope, architecture, timeline and deliverables." },
    { step: "03", title: "Design", desc: "Wireframes, interface design and user experience." },
    { step: "04", title: "Develop", desc: "Build using modern engineering practices." },
    { step: "05", title: "Quality Assurance", desc: "Test functionality, performance, responsiveness and compatibility." },
    { step: "06", title: "Launch", desc: "Production deployment and final verification." },
    { step: "07", title: "Support & Growth", desc: "Maintenance, optimization and future enhancements." }
  ];

  const industries = [
    { name: "Startups", icon: Building2, desc: "MVP development, brand setup & scalable architecture." },
    { name: "Retail & E-Commerce", icon: ShoppingBag, desc: "Online storefronts, inventory & Razorpay payment integration." },
    { name: "Education & EdTech", icon: GraduationCap, desc: "LMS portals, student portals & online course delivery." },
    { name: "Healthcare", icon: Stethoscope, desc: "HIPAA-ready patient booking portals & clinic software." },
    { name: "Restaurants & Food", icon: Utensils, desc: "Digital menus, online ordering & POS integrations." },
    { name: "Real Estate", icon: Home, desc: "Property listing portals, virtual tours & lead capture." },
    { name: "Travel & Hospitality", icon: Compass, desc: "Booking engines, itinerary planners & inquiry management." },
    { name: "Professional Services", icon: Briefcase, desc: "Consulting portals, client portals & automated scheduling." }
  ];

  const faqs = [
    { q: "How much does a website cost?", a: "Packages start from ₹10,000 for Starter websites, ₹20,000 for Business websites, and ₹30,000 for E-Commerce online stores. Custom software and complex AI solutions receive tailored scopes." },
    { q: "How long does development take?", a: "Starter websites typically take 7-10 business days. Custom business applications and full E-Commerce portals take 3-6 weeks depending on requirement scope." },
    { q: "Do you provide domain and hosting?", a: "Yes! We assist with domain registration, SSL certificates, cloud setup (Vercel/Azure), and ongoing server management." },
    { q: "Can you redesign an existing website?", a: "Absolutely. We modernize legacy websites into fast Next.js 16 web applications with improved UI/UX and mobile optimization." },
    { q: "Do you develop e-commerce websites?", a: "Yes, we build custom online stores with shopping carts, product management, and Razorpay payment gateway integrations." },
    { q: "Can you build custom software?", a: "Yes, we engineer ASP.NET Core 9 Web APIs and custom SaaS platforms tailored strictly around your internal workflow requirements." },
    { q: "Do you provide maintenance?", a: "Yes, we offer ongoing maintenance plans covering security patches, backups, uptime monitoring, and quarterly feature updates." },
    { q: "Do you work with startups?", a: "Yes! We specialize in startup digital transformation—from MVP scope validation to full product launch and scale." },
    { q: "Can you integrate payment gateways?", a: "Yes, we integrate Razorpay, Stripe, and custom payment processors with instant automated invoice receipt generation." },
    { q: "Do you provide source code?", a: "Yes, upon full project completion, complete source code ownership and repository access are transferred to your business." },
    { q: "Do you provide SEO?", a: "Every project includes technical SEO foundation, clean metadata, XML sitemaps, fast page load speeds, and Google Search Console readiness." },
    { q: "How do project payments work?", a: "We work on a milestone model (e.g., 40% initial deposit, 40% demo review milestone, 20% final launch deployment)." }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Technology Solutions for Growing Businesses</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-heading">
              Build Smarter. <br />
              <span className="text-blue-600 dark:text-blue-500">Grow Faster.</span> <br />
              Go Digital.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              We help startups and businesses design, develop, launch, and scale powerful digital experiences through websites, custom software, AI automation, cloud solutions, and strategic technology consulting.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link 
                href="/contact" 
                className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-3.5 rounded-full apple-glass border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-sm hover:bg-slate-200/60 dark:hover:bg-white/10 transition text-center"
              >
                Explore Our Services
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 pt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Free initial consultation • No obligation requirement review</span>
            </div>
          </div>

          {/* Right Abstract Tech Visual */}
          <div className="lg:col-span-5 apple-glass p-8 border border-slate-200 dark:border-white/15 relative shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Code2 className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Architecture Standard</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Enterprise Engineering</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                From your first idea to a scalable digital business, Ganesh NexGen Solutions delivers technology designed for growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">Next.js 16</div>
                <div className="text-[10px] text-slate-600 dark:text-zinc-400">Ultra-fast web UI</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">ASP.NET Core 9</div>
                <div className="text-[10px] text-slate-600 dark:text-zinc-400">CQRS Clean API</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="border-y border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-zinc-950/60 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section (01 to 08) */}
      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Our Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Technology Solutions Built Around Your Business
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            We don&apos;t just build websites. We build digital solutions that help businesses grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <Link key={idx} href={s.href} className="apple-glass p-6 apple-glass-hover block space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                {s.num}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{s.title}</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500">
            <span>View All Detailed Services</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Instant Interactive Proposal Estimator */}
      <section className="px-6 max-w-7xl mx-auto">
        <InteractiveProposalCalculator />
      </section>

      {/* Business Transformation Process */}
      <section className="px-6 max-w-7xl mx-auto space-y-12 bg-slate-100/90 dark:bg-zinc-950/40 p-8 rounded-3xl border border-slate-200 dark:border-white/10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Proven Methodology</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            From Business Idea to Digital Growth
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Clients don&apos;t need multiple vendors. Ganesh NexGen Solutions provides end-to-end technology support under one workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {processSteps.map((p, idx) => (
            <div key={idx} className="apple-glass p-4 text-center space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.step}</span>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">{p.title}</h5>
              <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-tight">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Why Partner With Us</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            More Than Development. A Technology Partner.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Business-First Thinking", desc: "We understand the business objective before selecting technology." },
            { title: "End-to-End Delivery", desc: "Strategy, design, engineering, deployment and support under one workflow." },
            { title: "Transparent Communication", desc: "Clear milestones, deliverables and progress updates." },
            { title: "Scalable Technology", desc: "Solutions designed for current needs and future expansion." },
            { title: "Long-Term Support", desc: "We stay involved beyond deployment to ensure continuous growth." }
          ].map((item, i) => (
            <div key={i} className="apple-glass p-6 space-y-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Tailored Solutions</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Industries We Serve Across India
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="apple-glass p-6 space-y-3">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">{ind.name}</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">{ind.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="px-6 max-w-7xl mx-auto apple-glass p-8 text-center border border-slate-200 dark:border-white/10 space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Client Stories</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">Client stories coming soon. Verified case studies and client feedback will be updated here.</p>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Clear Answers</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-heading">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="apple-glass overflow-hidden border border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-200 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Consultation CTA */}
      <section className="px-6 max-w-5xl mx-auto apple-glass p-10 border border-blue-500/30 text-center space-y-6 relative overflow-hidden">
        <div className="space-y-2">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Have an Idea? Let&apos;s Build It Together.
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Tell us what you&apos;re planning and we&apos;ll help you determine the right technology, scope, and path forward.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-xl shadow-blue-600/30 flex items-center gap-2"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a 
            href="https://wa.me/919390564946" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
          >
            WhatsApp Us Directly
          </a>
        </div>
      </section>
    </div>
  );
}
