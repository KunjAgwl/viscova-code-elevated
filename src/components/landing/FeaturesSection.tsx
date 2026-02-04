import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, Cpu, Layers } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const features = [
  {
    icon: Cpu,
    title: "AI-Powered Generation",
    description: "DeepSeek generates secure, production-ready code from your requirements.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Shield,
    title: "Multi-Layer Security",
    description: "Three AI engines validate and harden your code against OWASP Top 10.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "One-click deployment to Vercel or DigitalOcean with zero config.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Lock,
    title: "Secrets Management",
    description: "Built-in vault for API keys, credentials, and sensitive configuration.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Globe,
    title: "India-Optimized",
    description: "Local cloud regions, data sovereignty, and UPI-first payments.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Layers,
    title: "Full Stack Ready",
    description: "Frontend, backend, database, and auth—all generated and secured.",
    gradient: "from-secondary to-primary",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything you need to ship
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From idea to production, Viscova handles every step with security baked in.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
