import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, GitBranch, Shield, Rocket, FileCode, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const phases = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Interactive Discovery",
    description: "Share your idea, and our AI asks clarifying questions until requirements are crystal clear.",
    details: [
      "Natural language conversation",
      "Automatic requirement extraction",
      "SPEC.md generation",
    ],
    color: "primary",
  },
  {
    icon: GitBranch,
    number: "02",
    title: "Code Path Decision",
    description: "Starting fresh or improving existing code? Viscova adapts to your situation.",
    details: [
      "New project generation",
      "Existing code enhancement",
      "Security hardening for legacy code",
    ],
    color: "secondary",
  },
  {
    icon: Shield,
    number: "03",
    title: "Security Pipeline",
    description: "Three AI engines validate and harden your code against every known vulnerability.",
    details: [
      "DeepSeek: Static analysis & secrets scanning",
      "Kimi: Context-aware validation",
      "Gemini: Runtime checks & compliance",
    ],
    color: "accent",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deployment",
    description: "One-click deployment with monitoring, payments, and scaling built in.",
    details: [
      "Vercel & DigitalOcean integration",
      "Payment processors ready",
      "Post-deploy monitoring",
    ],
    color: "primary",
  },
];

const PhaseCard = ({ phase, index }: { phase: typeof phases[0]; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);

  const Icon = phase.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, x }}
      className="relative"
    >
      <div className="flex flex-col md:flex-row items-start gap-8 p-8 rounded-3xl bg-card border border-border">
        {/* Number and icon */}
        <div className="flex-shrink-0">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${phase.color} to-${phase.color}/50 p-0.5`}>
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <Icon className="w-10 h-10" style={{ color: `hsl(var(--${phase.color}))` }} />
            </div>
          </div>
          <div className="mt-4 text-5xl font-display font-bold text-muted-foreground/30">
            {phase.number}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{phase.title}</h3>
          <p className="text-muted-foreground text-lg mb-6">{phase.description}</p>
          
          <ul className="space-y-3">
            {phase.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <FileCode className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">The Viscova Pipeline</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            How Viscova Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From your initial idea to a production-ready, secure application—follow the journey 
            through our autonomous development pipeline.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {/* Phase cards */}
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <PhaseCard key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>

        {/* Architecture diagram placeholder */}
        <FadeIn className="mt-32">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              System Architecture
            </h2>
            <p className="text-muted-foreground text-lg">
              A complete view of the Viscova ecosystem
            </p>
          </div>
          
          <div className="aspect-video rounded-3xl bg-card border border-border flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <GitBranch className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Interactive architecture diagram</p>
              <p className="text-sm text-muted-foreground/60">MermaidJS integration coming soon</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HowItWorks;
