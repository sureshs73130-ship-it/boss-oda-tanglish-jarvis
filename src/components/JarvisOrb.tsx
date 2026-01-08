import { motion } from "framer-motion";

interface JarvisOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const JarvisOrb = ({ isListening, isSpeaking }: JarvisOrbProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ripple effects */}
      {isListening && (
        <>
          <motion.div
            className="absolute w-64 h-64 rounded-full border border-jarvis-glow/30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full border border-jarvis-glow/30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
        </>
      )}

      {/* Outer glow ring */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 50%, hsl(var(--jarvis-glow) / 0.1) 70%, transparent 100%)",
        }}
        animate={{
          rotate: 360,
          scale: isListening ? [1, 1.1, 1] : 1,
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: isListening ? Infinity : 0 },
        }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute w-56 h-56 rounded-full border border-jarvis-glow/20"
        style={{ borderStyle: "dashed" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-jarvis-glow/30"
        style={{ borderStyle: "dashed" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Main orb container */}
      <motion.div
        className="relative w-44 h-44 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, hsl(185 100% 80%), hsl(185 100% 55%) 40%, hsl(200 80% 30%) 80%, hsl(210 60% 15%) 100%)",
          boxShadow: `
            0 0 40px hsl(185 100% 55% / 0.7),
            0 0 80px hsl(185 100% 55% / 0.5),
            0 0 120px hsl(185 100% 55% / 0.3),
            inset 0 0 40px hsl(185 100% 70% / 0.3)
          `,
        }}
        animate={{
          scale: isSpeaking ? [1, 1.08, 1] : isListening ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isSpeaking ? 0.3 : 1.5,
          repeat: isSpeaking || isListening ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Inner core */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, hsl(var(--jarvis-glow) / 0.9), transparent 70%)",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Highlight */}
        <div
          className="absolute top-4 left-6 w-8 h-8 rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 100% / 0.8), transparent 70%)",
          }}
        />

        {/* Voice wave visualization */}
        {(isListening || isSpeaking) && (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-primary-foreground/80 rounded-full"
                animate={{
                  height: isSpeaking ? [8, 24, 8] : [4, 16, 4],
                }}
                transition={{
                  duration: isSpeaking ? 0.2 : 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-2 px-4 py-1 rounded-full bg-jarvis-surface-elevated border border-jarvis-glow/30"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-orbitron text-jarvis-glow uppercase tracking-widest">
          {isSpeaking ? "Speaking" : isListening ? "Listening" : "Ready"}
        </span>
      </motion.div>
    </div>
  );
};

export default JarvisOrb;
