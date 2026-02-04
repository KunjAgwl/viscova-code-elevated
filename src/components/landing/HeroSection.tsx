import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { GridBackground } from "@/components/animations/GridBackground";
import { PipelineAnimation } from "./PipelineAnimation";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const words = ["Idea", "Code", "Secure", "Live"];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <GridBackground />

      <div className="container relative z-10 pt-32 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              The future of autonomous development
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-5xl mx-auto mb-8"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">From </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              <AnimatedText words={words} interval={2500} />
            </span>
          </h1>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground">
            Without leaving one platform
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12"
        >
          Viscova is an end-to-end autonomous software development ecosystem. 
          AI-generated code with multi-layer security, deployed in minutes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg glow-primary"
            asChild
          >
            <Link to="/get-started">
              <span className="relative z-10 flex items-center gap-2">
                Start with an Idea
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-6 text-lg border-border hover:border-primary/50 hover:bg-primary/5"
            asChild
          >
            <Link to="/how-it-works">
              <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
              See How It Works
            </Link>
          </Button>
        </motion.div>

        {/* Pipeline animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <PipelineAnimation />
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
