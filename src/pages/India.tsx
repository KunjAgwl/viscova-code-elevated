import { motion } from "framer-motion";
import { MapPin, Shield, CreditCard, Server, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const regions = [
  { city: "Mumbai", x: "72%", y: "58%" },
  { city: "Bangalore", x: "68%", y: "72%" },
  { city: "Delhi", x: "70%", y: "35%" },
  { city: "Chennai", x: "74%", y: "75%" },
  { city: "Hyderabad", x: "70%", y: "62%" },
];

const features = [
  {
    icon: Server,
    title: "Local Cloud Regions",
    description: "Deploy to Mumbai, Bangalore, Delhi—data stays in India.",
  },
  {
    icon: Shield,
    title: "Data Sovereignty",
    description: "Compliant with India's data protection regulations.",
  },
  {
    icon: CreditCard,
    title: "UPI-First Payments",
    description: "Native UPI, Razorpay, and Paytm integration.",
  },
];

const India = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-sm text-primary font-medium">Made for India</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            India-Optimized Deployment
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built from the ground up for Indian developers and businesses. 
            Local infrastructure, local payments, local compliance.
          </p>
        </FadeIn>

        {/* Map visualization */}
        <FadeIn className="mb-20">
          <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl bg-card border border-border overflow-hidden">
            {/* Simplified India map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Region markers */}
            {regions.map((region, index) => (
              <motion.div
                key={region.city}
                className="absolute"
                style={{ left: region.x, top: region.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, type: "spring" }}
              >
                <motion.div
                  className="relative -translate-x-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 w-8 h-8 rounded-full bg-primary/30"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Marker */}
                  <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  
                  {/* Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                    <span className="px-2 py-1 rounded bg-card/90 text-xs font-medium border border-border">
                      {region.city}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {regions.map((region, i) => (
                regions.slice(i + 1).map((target, j) => (
                  <motion.line
                    key={`${region.city}-${target.city}`}
                    x1={region.x}
                    y1={region.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5 + (i + j) * 0.1, duration: 1 }}
                  />
                ))
              ))}
            </svg>
          </div>
        </FadeIn>

        {/* Features */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="p-8 rounded-2xl bg-card border border-border text-center h-full"
                whileHover={{ y: -5 }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* India Stack */}
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              Built on India Stack
            </h2>
            <div className="space-y-4">
              {[
                "Aadhaar-based authentication ready",
                "DigiLocker integration for document verification",
                "GST-compliant invoicing built in",
                "RBI-compliant payment processing",
                "CERT-In security standards",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default India;
