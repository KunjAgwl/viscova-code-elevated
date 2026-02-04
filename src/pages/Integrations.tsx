import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const integrations = [
  {
    name: "GitHub",
    description: "Connect your repositories for seamless code integration",
    logo: "GH",
    color: "from-gray-600 to-gray-800",
    features: ["Pull requests", "Branch protection", "Webhooks"],
  },
  {
    name: "Vercel",
    description: "One-click deployment to the edge",
    logo: "▲",
    color: "from-gray-900 to-gray-700",
    features: ["Instant deploys", "Preview URLs", "Analytics"],
  },
  {
    name: "DigitalOcean",
    description: "India-optimized cloud infrastructure",
    logo: "DO",
    color: "from-blue-500 to-blue-700",
    features: ["India regions", "Auto-scaling", "Managed DBs"],
  },
  {
    name: "Stripe",
    description: "Global payment processing",
    logo: "S",
    color: "from-purple-500 to-purple-700",
    features: ["Subscriptions", "Invoicing", "Webhooks"],
  },
  {
    name: "Razorpay",
    description: "India's leading payment gateway",
    logo: "R",
    color: "from-blue-600 to-blue-800",
    features: ["UPI", "Cards", "Netbanking"],
  },
];

const Integrations = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Integrations & Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Viscova connects seamlessly with your favorite tools and services.
          </p>
        </FadeIn>

        {/* Hub visualization */}
        <FadeIn className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Center hub */}
            <div className="relative flex items-center justify-center py-20">
              <motion.div
                className="absolute w-64 h-64 rounded-full border border-border"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full border border-primary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 z-10">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <span className="font-display font-bold text-2xl">V</span>
                </div>
              </div>

              {/* Orbiting logos */}
              {integrations.map((integration, index) => {
                const angle = (index * 360) / integrations.length;
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={integration.name}
                    className="absolute"
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white font-bold text-sm -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {integration.logo}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Integration cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <StaggerItem key={integration.name}>
              <motion.div
                className="p-6 rounded-2xl bg-card border border-border h-full"
                whileHover={{ y: -5, borderColor: "hsl(var(--primary) / 0.5)" }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white font-bold text-xl mb-4`}>
                  {integration.logo}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{integration.name}</h3>
                <p className="text-muted-foreground mb-4">{integration.description}</p>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-muted text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

export default Integrations;
