import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-zinc-950 border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand Info & Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 px-2.5 py-1 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/15 shadow-lg backdrop-blur-md">
              <img 
                src="/brand/logo.png" 
                alt="Ganesh NexGen Solutions" 
                className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
              />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight block">Ganesh NexGen</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase block -mt-1">
                Solutions
              </span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
            We don&apos;t just build websites. We build digital solutions that help businesses grow.
          </p>

          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Your Growth. Our Technology.
          </div>
        </div>

        {/* Col 2: Core Services */}
        <div className="space-y-3">
          <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Services</div>
          <ul className="space-y-2">
            <li><Link href="/services/web-development" className="hover:text-blue-600 dark:hover:text-white transition">Website Development</Link></li>
            <li><Link href="/services/ecommerce-development" className="hover:text-blue-600 dark:hover:text-white transition">E-Commerce Solutions</Link></li>
            <li><Link href="/services/custom-software" className="hover:text-blue-600 dark:hover:text-white transition">Custom Software</Link></li>
            <li><Link href="/services/ui-ux-design" className="hover:text-blue-600 dark:hover:text-white transition">UI/UX Design</Link></li>
            <li><Link href="/services/ai-automation" className="hover:text-blue-600 dark:hover:text-white transition">AI & Automation</Link></li>
            <li><Link href="/services/startup-solutions" className="hover:text-blue-600 dark:hover:text-white transition">Startup Solutions</Link></li>
          </ul>
        </div>

        {/* Col 3: Company & Resources */}
        <div className="space-y-3">
          <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Company</div>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition">About Us</Link></li>
            <li><Link href="/industries" className="hover:text-blue-600 dark:hover:text-white transition">Industries Served</Link></li>
            <li><Link href="/portfolio" className="hover:text-blue-600 dark:hover:text-white transition">Case Studies & Portfolio</Link></li>
            <li><Link href="/pricing" className="hover:text-blue-600 dark:hover:text-white transition">Transparent Pricing</Link></li>
            <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-white transition">Frequently Asked Questions</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Legal & Contact */}
        <div className="space-y-3">
          <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Legal & Contact</div>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link href="/refund" className="hover:text-blue-600 dark:hover:text-white transition">Refund & Cancellation Policy</Link></li>
          </ul>

          <div className="pt-2 text-[11px] space-y-1 text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> India</div>
            <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> contact@ganeshnexgen.com</div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-white/10 py-6 px-6 text-center text-[11px] text-slate-500 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © 2026 Ganesh NexGen Solutions. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-zinc-400">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
