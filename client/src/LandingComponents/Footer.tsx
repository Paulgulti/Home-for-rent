import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 lg:py-20 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="font-serif text-2xl">PropManage</span>
            </a>
            <p className="text-background/60 leading-relaxed">
              Simplifying property management for owners, managers, and tenants across the nation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Features</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Integrations</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} PropManage. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">Twitter</a>
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
