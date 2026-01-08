import { motion } from "framer-motion";

const suggestions = [
  { command: '"Open Google"', description: "Google open pannuren" },
  { command: '"Open YouTube"', description: "YouTube open pannuren" },
  { command: '"Play Spotify"', description: "Spotify open pannuren" },
  { command: '"Search YouTube for..."', description: "YouTube-la search pannuren" },
];

const CommandSuggestions = () => {
  return (
    <div className="w-full max-w-xl">
      <h3 
        className="text-xs font-orbitron uppercase tracking-[0.2em] mb-4 text-center"
        style={{ color: "hsl(185 60% 45%)" }}
      >
        Try saying
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.command}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="p-3 rounded-lg border transition-all duration-300 hover:border-primary/40"
            style={{
              background: "hsl(220 35% 8% / 0.8)",
              borderColor: "hsl(185 100% 55% / 0.15)",
            }}
          >
            <p 
              className="text-sm font-rajdhani font-medium mb-1"
              style={{ color: "hsl(185 80% 75%)" }}
            >
              {suggestion.command}
            </p>
            <p className="text-xs text-muted-foreground">
              → {suggestion.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommandSuggestions;
