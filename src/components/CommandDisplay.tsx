import { motion, AnimatePresence } from "framer-motion";

interface CommandDisplayProps {
  userCommand: string;
  jarvisResponse: string;
  action: string | null;
}

const CommandDisplay = ({ userCommand, jarvisResponse, action }: CommandDisplayProps) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* User command */}
      <AnimatePresence mode="wait">
        {userCommand && (
          <motion.div
            key={userCommand}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="jarvis-border-glow rounded-lg p-4 bg-jarvis-surface/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-jarvis-glow animate-pulse" />
              <span className="text-xs font-orbitron text-muted-foreground uppercase tracking-wider">
                Boss Command
              </span>
            </div>
            <p className="text-lg font-rajdhani text-foreground">{userCommand}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jarvis response */}
      <AnimatePresence mode="wait">
        {jarvisResponse && (
          <motion.div
            key={jarvisResponse}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="jarvis-border-glow rounded-lg p-4 bg-jarvis-surface-elevated/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-jarvis-glow-intense"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              />
              <span className="text-xs font-orbitron text-jarvis-glow uppercase tracking-wider">
                Jarvis
              </span>
            </div>
            <p className="text-xl font-rajdhani text-jarvis-text-glow jarvis-text-glow">
              {jarvisResponse}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action indicator */}
      <AnimatePresence>
        {action && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-jarvis-glow/10 border border-jarvis-glow/30 w-fit mx-auto"
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-jarvis-glow"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-jarvis-glow">
              {action}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandDisplay;
