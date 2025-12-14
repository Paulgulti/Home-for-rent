import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 px-8 py-8 md:py-16 lg:px-16 lg:py-24 text-center">
            <h2 className="font-serif text-2xl md:text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-6 max-w-3xl mx-auto">
              Tired of renting hustle or managing your own property?
            </h2>
            <p className="text-primary-foreground/80 md:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of property owners and tenants who've simplified their life with PropManage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={'/properties'}
                className="md:px-10 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-center rounded-md font-semibold py-1.5 text-[14px] hover:cursor-pointer"
              >
                Properties
              </Link>
              <Link
                to={'/dashboard'}
                className="md:px-10 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-center rounded-md font-semibold py-1.5 text-[14px] hover:cursor-pointer"
              >
                Dashboard
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              No wasting time • No middleman • 100% free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
