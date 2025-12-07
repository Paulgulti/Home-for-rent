const stats = [
  { value: "15K+", label: "Properties Managed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$2.5B", label: "Rent Collected" },
  { value: "50+", label: "Cities Served" },
];

const Stats = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
