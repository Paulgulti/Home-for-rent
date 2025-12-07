import { Home, Users, Wrench, BarChart3, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Property Listings",
    description: "Showcase your properties with beautiful listings that attract quality tenants fast.",
  },
  {
    icon: Users,
    title: "Tenant Screening",
    description: "Comprehensive background checks, credit reports, and rental history verification.",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracking",
    description: "Streamlined work orders with vendor management and real-time status updates.",
  },
  {
    icon: BarChart3,
    title: "Financial Reports",
    description: "Detailed income statements, expense tracking, and tax-ready documentation.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Automated rent collection with multiple payment options and late fee management.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for you and your tenants, whenever you need it.",
  },
];

const Features = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Services</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed to streamline your property management workflow and maximize your returns.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
