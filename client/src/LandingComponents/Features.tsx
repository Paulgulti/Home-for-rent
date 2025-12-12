import { Home, Users, Wrench, BarChart3, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Property Listings",
    description: "Showcase your properties with beautiful listings that attract tenants fast.",
  },
  {
    icon: Users,
    title: "Update Information",
    description: "Easily update your property status or the information you provided about your property.",
  },
  {
    icon: Wrench,
    title: "Easy Find",
    description: "Tentants browse through dozens of properties by using our search and filtering mechanisms.",
  },
  {
    icon: BarChart3,
    title: "No Friction",
    description: "Tenants contact the property owner directly without any middleman.",
  },
];

const Features = () => {
  return (
    <section id="services" className="py-8 md:pt-10 lg:py-24 bg-secondary/30">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <h2 className="font-serif text-2xl md:text-3xl sm:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
            Everything You Need to Manage and rent a property
          </h2>
          <p className="text-muted-foreground text-md md:text-lg">
            Convenient tool designed to streamline your property management workflow and maximize your returns.
          </p>
        </div>

        {/* Features Grid */}
          <p className="text-center mb-4 text-gray-700 font-medium text-sm uppercase tracking-wider">Services</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-4 md:p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-md md:rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
              </div>
              <h3 className="font-serif md:text-xl text-foreground md:mb-1">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
