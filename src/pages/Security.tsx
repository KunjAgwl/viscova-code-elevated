import { motion } from "framer-motion";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle, Layers, Bug, Key, Settings } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { useState } from "react";

const securityLayers = [
  {
    name: "DeepSeek",
    description: "Static Analysis & Secrets Scanning",
    details: "SAST scanning, dependency vulnerabilities, hardcoded secrets detection, configuration analysis",
    icon: Eye,
    color: "primary",
  },
  {
    name: "Kimi",
    description: "Context-Aware Validation",
    details: "Business logic analysis, auto-remediation suggestions, pattern recognition across codebase",
    icon: Bug,
    color: "secondary",
  },
  {
    name: "Gemini",
    description: "Runtime & Compliance",
    details: "DAST checks, infrastructure review, compliance verification, final security certification",
    icon: Shield,
    color: "accent",
  },
];

const owaspTop10 = [
  { id: "A01", name: "Broken Access Control", covered: true },
  { id: "A02", name: "Cryptographic Failures", covered: true },
  { id: "A03", name: "Injection", covered: true },
  { id: "A04", name: "Insecure Design", covered: true },
  { id: "A05", name: "Security Misconfiguration", covered: true },
  { id: "A06", name: "Vulnerable Components", covered: true },
  { id: "A07", name: "Auth Failures", covered: true },
  { id: "A08", name: "Data Integrity Failures", covered: true },
  { id: "A09", name: "Logging Failures", covered: true },
  { id: "A10", name: "SSRF", covered: true },
];

const beforeAfterCode = {
  before: `// ❌ Insecure AI-generated code
const query = "SELECT * FROM users WHERE id = " + userId;
const password = "admin123";
const apiKey = "sk-1234567890abcdef";

app.get('/user/:id', (req, res) => {
  db.query(query);
  res.json({ data: user, password: password });
});`,
  after: `// ✅ Viscova-hardened code
const query = "SELECT * FROM users WHERE id = $1";
const password = await hashPassword(input);
const apiKey = process.env.API_KEY;

app.get('/user/:id', validateInput(), (req, res) => {
  db.query(query, [sanitize(req.params.id)]);
  res.json({ data: sanitizeOutput(user) });
});`,
};

const Security = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent">Security-First Architecture</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Defense in Depth
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three AI engines. Zero compromises. Every line of code passes through 
            our multi-layer security pipeline before deployment.
          </p>
        </FadeIn>

        {/* Security Layers Visualization */}
        <FadeIn className="mb-32">
          <div className="relative max-w-4xl mx-auto">
            {/* Layered circles */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {securityLayers.map((layer, index) => {
                const size = 100 - index * 25;
                const isActive = activeLayer === index;
                
                return (
                  <motion.div
                    key={layer.name}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                      isActive ? "border-opacity-100" : "border-opacity-30"
                    }`}
                    style={{
                      width: `${size}%`,
                      height: `${size}%`,
                      borderColor: `hsl(var(--${layer.color}))`,
                      backgroundColor: isActive ? `hsl(var(--${layer.color}) / 0.1)` : "transparent",
                    }}
                    onClick={() => setActiveLayer(index)}
                    whileHover={{ scale: 1.02 }}
                    animate={{
                      boxShadow: isActive
                        ? `0 0 30px hsl(var(--${layer.color}) / 0.3)`
                        : "none",
                    }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <layer.icon className="w-12 h-12 mx-auto mb-3" style={{ color: `hsl(var(--${layer.color}))` }} />
                          <h3 className="font-display text-xl font-bold mb-2">{layer.name}</h3>
                          <p className="text-sm text-muted-foreground">{layer.description}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Layer details */}
            <div className="mt-8 text-center">
              <motion.p
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-muted-foreground max-w-xl mx-auto"
              >
                {securityLayers[activeLayer].details}
              </motion.p>
            </div>
          </div>
        </FadeIn>

        {/* OWASP Coverage */}
        <FadeIn className="mb-32">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              OWASP Top 10 Coverage
            </h2>
            <p className="text-muted-foreground text-lg">
              Complete protection against the most critical web security risks
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {owaspTop10.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  className="p-4 rounded-xl bg-card border border-border text-center"
                  whileHover={{ y: -5, borderColor: "hsl(var(--accent))" }}
                >
                  <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-mono text-sm text-muted-foreground">{item.id}</p>
                  <p className="text-xs font-medium mt-1">{item.name}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        {/* Before/After Code */}
        <FadeIn className="mb-32">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Before & After
            </h2>
            <p className="text-muted-foreground text-lg">
              See how Viscova transforms insecure AI-generated code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg bg-muted p-1">
                <button
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    !showAfter ? "bg-card text-foreground shadow" : "text-muted-foreground"
                  }`}
                  onClick={() => setShowAfter(false)}
                >
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Insecure Code
                </button>
                <button
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    showAfter ? "bg-card text-foreground shadow" : "text-muted-foreground"
                  }`}
                  onClick={() => setShowAfter(true)}
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Hardened Code
                </button>
              </div>
            </div>

            {/* Code block */}
            <motion.div
              key={showAfter ? "after" : "before"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card border border-border overflow-hidden"
            >
              <div className={`px-4 py-2 border-b border-border flex items-center gap-2 ${
                showAfter ? "bg-accent/10" : "bg-destructive/10"
              }`}>
                {showAfter ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
                <span className="text-sm font-medium">
                  {showAfter ? "Viscova-hardened code" : "Insecure AI-generated code"}
                </span>
              </div>
              <pre className="p-6 overflow-x-auto">
                <code className="font-mono text-sm">
                  {showAfter ? beforeAfterCode.after : beforeAfterCode.before}
                </code>
              </pre>
            </motion.div>
          </div>
        </FadeIn>

        {/* Security Features Grid */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Security Features
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Key, title: "Secrets Vault", description: "Encrypted storage for API keys and credentials" },
              { icon: Layers, title: "Dependency Scan", description: "Real-time vulnerability detection in packages" },
              { icon: Settings, title: "Config Hardening", description: "Automatic security configuration" },
              { icon: Eye, title: "Threat Detection", description: "Continuous monitoring and alerts" },
            ].map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="p-6 rounded-2xl bg-card border border-border h-full"
                  whileHover={{ y: -5 }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </div>
  );
};

export default Security;
