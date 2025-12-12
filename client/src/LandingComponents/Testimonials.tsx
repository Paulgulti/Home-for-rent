import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

function Testimonial() {
    const testimonials = [
        {
            description:
                "This platform takes the hassle out of renting. Finding properties has never been this easy!",
            image:
                "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            name: "Neguse Aseffa",
            handle: "Tenant",
        },
        {
            description:
                "I found a great apartment within days! The website’s filtering tools made the search stress-free and efficient.",
            image:
                "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            name: "Girma Haile",
            handle: "Tenant",
        },
        {
            description:
                "As a property owner, I love how streamlined the process is. Managing listings and applications all in one place saves me so much time.",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            name: "Birtukan Chalchisa",
            handle: "Property owner",
        },
        {
            description:
                "Finding the perfect rental was so simple! The advanced search filters helped me narrow down options instantly.",
            image:
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            name: "Helen Tiruneh",
            handle: "Tenant",
        },
        {
            description:
                "Listing my property was a breeze! The platform made it easy to connect with tenants quickly and securely.",
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            name: "Demeke Gizaw",
            handle: "Property owner",
        },
    ]
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const speed = 1; // pixels per frame

    useEffect(() => {
        let animationFrame: number;

        const loop = () => {
            if (containerRef.current && !isHovered) {
                const width = containerRef.current.scrollWidth / 2;
                const prev = x.get();             // get current value
                const next = prev <= -width ? 0 : prev - speed;
                x.set(next);
            }
            animationFrame = requestAnimationFrame(loop);
        };

        animationFrame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrame);
    }, [isHovered, x, testimonials]);
    return (
        <div
            className="overflow-hidden py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex gap-5"
                style={{ x }}
            >
                {[...testimonials, ...testimonials].map((t, i) => (
                    <div
                        key={i}
                        className="shrink-0 w-80 flex gap-5 shadow-2xl p-4 rounded-2xl bg-white"
                    >
                        <img
                            className="w-20 h-7 rounded-full object-cover"
                            src={t.image}
                            alt={t.name}
                        />
                        <div>
                            <p className="font-semibold">{t.name}</p>
                            <p className="text-sm text-gray-500">{t.handle}</p>
                            <p className="mt-2 text-sm">{t.description}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default Testimonial