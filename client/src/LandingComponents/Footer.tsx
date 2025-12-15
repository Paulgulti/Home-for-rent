import { Building2 } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer id="contact" className="py-8 md:py-14 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-12">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="font-serif text-xl md:text-2xl">Akeray</span>
            </a>
            <p className="text-sm md:text-[16px] text-background/60 leading-relaxed">
              Simplifying property management for owners, managers, and tenants across the nation.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 Akeray. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="https://x.com/Paulma00s" target="_blank"  className="text-background/60 hover:text-background transition-colors text-sm">Twitter</Link>
            <Link to="#" target="_blank" className="text-background/60 hover:text-background transition-colors text-sm">LinkedIn</Link>
            <Link to="https://github.com/Paulgulti" target="_blank" className="text-background/60 hover:text-background transition-colors text-sm">Github</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
