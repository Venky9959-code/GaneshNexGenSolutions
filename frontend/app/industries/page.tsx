import Link from "next/link";
import { 
  Building2, Store, ShoppingBag, GraduationCap, Stethoscope, 
  Utensils, Home, Compass, Briefcase, ArrowRight 
} from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    { name: "Startups", icon: Building2, desc: "MVP development, brand identity, digital setup, and rapid launch roadmaps." },
    { name: "Retail & E-Commerce", icon: ShoppingBag, desc: "Online storefronts, inventory management, shopping carts, and Razorpay." },
    { name: "Education & EdTech", icon: GraduationCap, desc: "LMS platforms, student management, and online course delivery." },
    { name: "Healthcare", icon: Stethoscope, desc: "Patient booking portals, clinic management software, and security compliance." },
    { name: "Restaurants & Hospitality", icon: Utensils, desc: "Digital QR menus, online food ordering, and POS system integrations." },
    { name: "Real Estate", icon: Home, desc: "Property listing portals, virtual tours, and automated lead capture." },
    { name: "Travel & Tourism", icon: Compass, desc: "Online booking engines, itinerary planners, and inquiry workflows." },
    { name: "Professional Services", icon: Briefcase, desc: "Consulting web portals, client self-service portals, and automated scheduling." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Industries We Serve Across India
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Tailored digital solutions engineered for your industry&apos;s specific operational requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div key={idx} className="apple-glass p-6 space-y-4 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{ind.name}</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{ind.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link href="/contact" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30">
          <span>Discuss Industry Solution</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
