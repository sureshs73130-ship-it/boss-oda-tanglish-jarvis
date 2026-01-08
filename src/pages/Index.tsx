import { motion } from "framer-motion";
import JarvisOrb from "@/components/JarvisOrb";
import MicButton from "@/components/MicButton";
import CommandDisplay from "@/components/CommandDisplay";
import CommandSuggestions from "@/components/CommandSuggestions";
import useJarvis from "@/hooks/useJarvis";

const Index = () => {
  const {
    isListening,
    isSpeaking,
    userCommand,
    jarvisResponse,
    action,
    toggleListening,
  } = useJarvis();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(185 100% 55% / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(185 100% 55% / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Central radial glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: "radial-gradient(circle, hsl(185 100% 55% / 0.12) 0%, hsl(185 100% 55% / 0.05) 40%, transparent 70%)",
          }}
        />

        {/* Scan line effect */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ top: "-2%" }}
          animate={{ top: "102%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 
            className="text-5xl md:text-6xl font-orbitron font-bold tracking-wider"
            style={{
              color: "hsl(185 100% 70%)",
              textShadow: `
                0 0 10px hsl(185 100% 70% / 0.9),
                0 0 30px hsl(185 100% 55% / 0.7),
                0 0 50px hsl(185 100% 55% / 0.5)
              `,
            }}
          >
            JARVIS
          </h1>
          <p className="text-sm md:text-base font-rajdhani text-muted-foreground mt-2 tracking-widest uppercase">
            Just A Rather Very Intelligent System
          </p>
        </motion.div>

        {/* Jarvis Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-4"
        >
          <JarvisOrb isListening={isListening} isSpeaking={isSpeaking} />
        </motion.div>

        {/* Command Display or Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="min-h-[140px] flex items-center justify-center w-full max-w-2xl"
        >
          {(userCommand || jarvisResponse) ? (
            <CommandDisplay
              userCommand={userCommand}
              jarvisResponse={jarvisResponse}
              action={action}
            />
          ) : (
            <CommandSuggestions />
          )}
        </motion.div>

        {/* Mic Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <MicButton
            isListening={isListening}
            onClick={toggleListening}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 pb-4 text-center"
      >
        <p className="text-xs text-muted-foreground/60 font-rajdhani tracking-wide">
          Privacy-first • Offline capable • Boss-oda personal AI
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
