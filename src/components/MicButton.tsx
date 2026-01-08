import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const MicButton = ({ isListening, onClick, disabled }: MicButtonProps) => {
  return (
    <div className="relative">
      {/* Label above button */}
      <span 
        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-orbitron uppercase tracking-widest whitespace-nowrap"
        style={{ color: "hsl(185 40% 50%)" }}
      >
        {isListening ? "Tap to stop" : "Tap to speak"}
      </span>

      <motion.button
        onClick={onClick}
        disabled={disabled}
        className="relative p-5 rounded-full transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: isListening 
            ? "hsl(185 100% 55% / 0.2)" 
            : "hsl(220 30% 12%)",
          border: `2px solid ${isListening ? "hsl(185 100% 55% / 0.6)" : "hsl(185 100% 55% / 0.3)"}`,
          boxShadow: isListening
            ? `0 0 30px hsl(185 100% 55% / 0.5), 0 0 60px hsl(185 100% 55% / 0.3), inset 0 0 20px hsl(185 100% 55% / 0.2)`
            : `0 0 20px hsl(185 100% 55% / 0.2), 0 0 40px hsl(185 100% 55% / 0.1)`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid hsl(185 100% 55% / 0.5)" }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid hsl(185 100% 55% / 0.5)" }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* Icon */}
        <motion.div
          animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        >
          {isListening ? (
            <Mic 
              className="w-7 h-7" 
              style={{ color: "hsl(185 100% 65%)" }}
            />
          ) : (
            <MicOff 
              className="w-7 h-7 transition-colors" 
              style={{ color: "hsl(185 40% 50%)" }}
            />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default MicButton;
