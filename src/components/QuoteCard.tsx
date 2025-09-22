import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

const QuoteCard = () => {
  const quotes = [
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
    },
    {
      text: "The more you learn, the more you earn.",
      author: "Warren Buffett",
    },
  ];

  const todaysQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <motion.div
      className="glass-card p-6 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Floating animation background */}
      <motion.div
        className="absolute -top-4 -right-4 text-primary/20"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkles className="h-16 w-16" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Daily Inspiration</h3>
        </div>

        <blockquote className="text-foreground italic text-lg leading-relaxed mb-4">
          "{todaysQuote.text}"
        </blockquote>

        <cite className="text-primary font-medium">
          — {todaysQuote.author}
        </cite>
      </div>
    </motion.div>
  );
};

export default QuoteCard;