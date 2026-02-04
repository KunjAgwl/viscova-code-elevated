import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Sparkles, Zap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FadeIn } from "@/components/animations/FadeIn";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "Perfect for side projects and learning",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 100,
    icon: Sparkles,
    popular: false,
    features: [
      "100 credits/month",
      "Basic security scanning",
      "Community support",
      "1 project",
      "Shared hosting",
    ],
  },
  {
    name: "Pro",
    description: "For professional developers and small teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    credits: 1000,
    icon: Zap,
    popular: true,
    features: [
      "1,000 credits/month",
      "Full security pipeline",
      "Priority support",
      "Unlimited projects",
      "Custom domains",
      "Team collaboration",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    credits: 10000,
    icon: Building,
    popular: false,
    features: [
      "10,000+ credits/month",
      "Dedicated security team",
      "24/7 support",
      "Unlimited everything",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Compliance reports",
    ],
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Simple, Credit-Based Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Pay for what you use. Credits cover code generation, security scans, 
            and deployments.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                Save 20%
              </span>
            </span>
          </div>
        </FadeIn>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary glow-primary"
                    : "bg-card border border-border"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <motion.span
                      className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl ${
                    plan.popular ? "bg-primary/20" : "bg-muted"
                  } flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold">
                      ${price}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.credits.toLocaleString()} credits included
                  </p>
                </div>

                <Button
                  className={`w-full mb-6 ${plan.popular ? "glow-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/get-started">Get Started</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Credit explanation */}
        <FadeIn className="mt-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-4">
              What are credits?
            </h3>
            <p className="text-muted-foreground mb-6">
              Credits are our universal currency for all Viscova operations:
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="font-bold text-lg mb-1">1 credit</p>
                <p className="text-muted-foreground">100 lines of code</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="font-bold text-lg mb-1">5 credits</p>
                <p className="text-muted-foreground">Security scan</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="font-bold text-lg mb-1">10 credits</p>
                <p className="text-muted-foreground">Deployment</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Pricing;
