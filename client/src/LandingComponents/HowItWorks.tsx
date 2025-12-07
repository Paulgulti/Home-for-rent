const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes and add your properties to our platform with our easy onboarding process.",
  },
  {
    number: "02",
    title: "List Your Properties",
    description: "Upload photos, set pricing, and create compelling listings that attract quality tenants.",
  },
  {
    number: "03",
    title: "Screen & Select Tenants",
    description: "Use our comprehensive screening tools to find reliable tenants who pay on time.",
  },
  {
    number: "04",
    title: "Manage & Grow",
    description: "Automate rent collection, handle maintenance, and scale your portfolio with confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Process</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Get started in four simple steps and transform the way you manage your properties.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-4" />
              )}
              
              <div className="relative">
                <span className="font-serif text-6xl text-primary/10 absolute -top-4 -left-2">
                  {step.number}
                </span>
                <div className="pt-12">
                  <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
