import { motion } from "framer-motion";
import { Lightbulb, MessageCircleQuestion, Code2, Shield, Cloud, Rocket } from "lucide-react";
import { useState } from "react";

const pipelineSteps = [
  {
    icon: Lightbulb,
    title: "Idea",
    description: "Share your vision",
    color: "primary",
  },
  {
    icon: MessageCircleQuestion,
    title: "Questions",
    description: "AI refines requirements",
    color: "secondary",
  },
  {
    icon: Code2,
    title: "Code",
    description: "Secure code generation",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Multi-layer hardening",
    color: "accent",
  },
  {
    icon: Cloud,
    title: "Hosting",
    description: "One-click deployment",
    color: "secondary",
  },
  {
    icon: Rocket,
    title: "Live App",
    description: "Your product is born",
    color: "primary",
  },
];

export const PipelineAnimation = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="relative py-16">
      {/* Connection line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-muted to-transparent -translate-y-1/2" />
      
      {/* Animated data flow */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 overflow-hidden"
      >
        <motion.div
          className="h-full w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            x: ["-100%", "400%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Pipeline steps */}
      <div className="relative flex items-center justify-between max-w-6xl mx-auto px-4">
        {pipelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          
          return (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center cursor-pointer z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Node */}
              <motion.div
                className={`
                  relative w-16 h-16 rounded-2xl flex items-center justify-center
                  bg-card border border-border
                  transition-all duration-300
                  ${isActive ? `glow-${step.color}` : ""}
                `}
                whileHover={{ scale: 1.1 }}
                animate={{
                  borderColor: isActive ? `hsl(var(--${step.color}))` : undefined,
                }}
              >
                <Icon 
                  className={`w-7 h-7 transition-colors duration-300 ${
                    isActive ? `text-${step.color}` : "text-muted-foreground"
                  }`}
                  style={{
                    color: isActive ? `hsl(var(--${step.color}))` : undefined,
                  }}
                />
                
                {/* Pulse ring */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: `hsl(var(--${step.color}))` }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <motion.div
                className="mt-4 text-center"
                animate={{
                  y: isActive ? -5 : 0,
                }}
              >
                <p className={`font-display font-semibold transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </p>
                
                {/* Expanded description */}
                <motion.p
                  className="text-sm text-muted-foreground mt-1 max-w-[120px]"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? "auto" : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>

              {/* Step number */}
              <div className="absolute -top-3 -right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
