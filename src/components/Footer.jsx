import { Droplets } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-24 bg-brand-background">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-tertiary rounded-full flex justify-center items-center">
            <Droplets className="w-6 h-6 text-brand-primary" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-brand-text">BaalCare</span>
        </div>
        
        <div className="text-sm text-brand-text/50">
          © {new Date().getFullYear()} BaalCare. Fresh minimalism.
        </div>

        <div className="flex gap-6 text-brand-text/70 font-display text-sm">
          <a href="#" className="hover:text-brand-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Facebook</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
