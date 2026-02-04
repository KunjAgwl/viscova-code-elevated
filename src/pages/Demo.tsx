import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Upload, CheckCircle, Shield, Loader2, FileCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FadeIn } from "@/components/animations/FadeIn";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
}

const initialMessages: Message[] = [
  { id: 1, type: "ai", content: "👋 Hi! I'm Viscova AI. Tell me about the app you want to build." },
];

const aiResponses = [
  "Interesting! What's the main problem this app solves?",
  "Got it. Who are your target users?",
  "Makes sense. What features are must-haves for launch?",
  "Perfect! Should this integrate with any external services?",
  "Great! I have enough to generate your SPEC.md. Ready to proceed?",
];

const securitySteps = [
  { name: "Static Analysis (DeepSeek)", duration: 2000 },
  { name: "Context Validation (Kimi)", duration: 1500 },
  { name: "Runtime Checks (Gemini)", duration: 2000 },
  { name: "Final Certification", duration: 1000 },
];

const Demo = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasExistingCode, setHasExistingCode] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"chat" | "security" | "complete">("chat");
  const [securityStep, setSecurityStep] = useState(0);
  const [responseIndex, setResponseIndex] = useState(0);

  const sendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      if (responseIndex < aiResponses.length) {
        const aiMessage: Message = {
          id: messages.length + 2,
          type: "ai",
          content: aiResponses[responseIndex],
        };
        setMessages((prev) => [...prev, aiMessage]);
        setResponseIndex((prev) => prev + 1);
        
        if (responseIndex === aiResponses.length - 1) {
          // Start security phase after last response
          setTimeout(() => setCurrentPhase("security"), 1500);
        }
      }
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Security scan animation
  useEffect(() => {
    if (currentPhase !== "security") return;

    const runSecurityScan = async () => {
      for (let i = 0; i < securitySteps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, securitySteps[i].duration));
        setSecurityStep(i + 1);
      }
      setTimeout(() => setCurrentPhase("complete"), 500);
    };

    runSecurityScan();
  }, [currentPhase]);

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">Interactive Demo</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Try Viscova
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the autonomous development pipeline. This is a mock demo 
            showing how Viscova works.
          </p>
        </FadeIn>

        {/* Demo Container */}
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {["Discovery", "Security", "Complete"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    (currentPhase === "chat" && index === 0) ||
                    (currentPhase === "security" && index === 1) ||
                    (currentPhase === "complete" && index === 2)
                      ? "bg-primary text-primary-foreground"
                      : index < ["chat", "security", "complete"].indexOf(currentPhase)
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < ["chat", "security", "complete"].indexOf(currentPhase) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{step}</span>
                {index < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Toggle for existing code */}
          <div className="flex items-center justify-center gap-3 mb-8 p-4 rounded-xl bg-card border border-border">
            <span className="text-sm text-muted-foreground">Starting fresh</span>
            <Switch
              checked={hasExistingCode}
              onCheckedChange={setHasExistingCode}
            />
            <span className="text-sm text-muted-foreground">I have existing code</span>
          </div>

          {/* Chat / Security / Complete phases */}
          <AnimatePresence mode="wait">
            {currentPhase === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                {/* Chat messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Upload area (if has existing code) */}
                {hasExistingCode && (
                  <div className="px-6 py-4 border-t border-border">
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop your code or click to upload
                      </p>
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Describe your app idea..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={isTyping}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentPhase === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl bg-card border border-border p-8"
              >
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-accent" />
                  <h3 className="font-display text-2xl font-bold mb-2">Security Pipeline</h3>
                  <p className="text-muted-foreground">Running multi-layer security analysis...</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  {securitySteps.map((step, index) => (
                    <motion.div
                      key={step.name}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: index <= securityStep ? 1 : 0.5 }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < securityStep
                          ? "bg-accent text-accent-foreground"
                          : index === securityStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        {index < securityStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : index === securityStep ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span className={index <= securityStep ? "text-foreground" : "text-muted-foreground"}>
                        {step.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentPhase === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-card border border-accent/50 p-8 text-center glow-accent"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <CheckCircle className="w-20 h-20 mx-auto mb-6 text-accent" />
                </motion.div>
                <h3 className="font-display text-3xl font-bold mb-2">Security Certified!</h3>
                <p className="text-muted-foreground mb-6">
                  Your code passed all security checks and is ready for deployment.
                </p>
                
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30">
                  <FileCode className="w-5 h-5 text-accent" />
                  <span className="font-medium">VISCOVA_CERTIFIED_2024</span>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => {
                      setMessages(initialMessages);
                      setResponseIndex(0);
                      setSecurityStep(0);
                      setCurrentPhase("chat");
                    }}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Demo;
