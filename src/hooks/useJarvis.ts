import { useState, useCallback, useRef, useEffect } from "react";

// Type declarations for Web Speech API
type SpeechRecognitionType = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

interface JarvisState {
  isListening: boolean;
  isSpeaking: boolean;
  userCommand: string;
  jarvisResponse: string;
  action: string | null;
}

interface JarvisAction {
  type: "OPEN_URL";
  url: string;
}

const useJarvis = () => {
  const [state, setState] = useState<JarvisState>({
    isListening: false,
    isSpeaking: false,
    userCommand: "",
    jarvisResponse: "",
    action: null,
  });

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI();
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = "en-IN"; // English-India for Tanglish support
        }
      }
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Process command and generate Tanglish response
  const processCommand = useCallback((command: string): { response: string; action: JarvisAction | null } => {
    const lowerCommand = command.toLowerCase();

    // Open Google
    if (lowerCommand.includes("open google") || lowerCommand.includes("google open")) {
      return {
        response: "Boss, Google open pannuren.",
        action: { type: "OPEN_URL", url: "https://www.google.com" },
      };
    }

    // Open YouTube
    if (lowerCommand.includes("open youtube") || lowerCommand.includes("youtube open")) {
      return {
        response: "Boss, YouTube open pannuren.",
        action: { type: "OPEN_URL", url: "https://www.youtube.com" },
      };
    }

    // Open Gmail
    if (lowerCommand.includes("open gmail") || lowerCommand.includes("gmail open")) {
      return {
        response: "Boss, Gmail open pannuren.",
        action: { type: "OPEN_URL", url: "https://mail.google.com" },
      };
    }

    // Open Spotify or play song
    if (lowerCommand.includes("spotify") || lowerCommand.includes("play song") || lowerCommand.includes("play music")) {
      // Extract song name if provided
      const songMatch = lowerCommand.match(/play\s+(.+?)(?:\s+on\s+spotify)?$/i) ||
                        lowerCommand.match(/spotify\s+la\s+(.+?)\s+play/i);
      
      if (songMatch && songMatch[1] && !songMatch[1].includes("spotify") && !songMatch[1].includes("song")) {
        const songName = encodeURIComponent(songMatch[1].trim());
        return {
          response: `Boss, Spotify open panni "${songMatch[1]}" song play pannuren.`,
          action: { type: "OPEN_URL", url: `https://open.spotify.com/search/${songName}` },
        };
      }
      
      return {
        response: "Boss, Spotify open pannuren.",
        action: { type: "OPEN_URL", url: "https://open.spotify.com" },
      };
    }

    // Search YouTube
    if (lowerCommand.includes("search youtube") || lowerCommand.includes("youtube la search")) {
      const searchMatch = lowerCommand.match(/search\s+youtube\s+(?:for\s+)?(.+)/i) ||
                          lowerCommand.match(/youtube\s+la\s+(.+?)\s+search/i);
      
      if (searchMatch && searchMatch[1]) {
        const query = encodeURIComponent(searchMatch[1].trim());
        return {
          response: `Boss, YouTube-la "${searchMatch[1]}" search pannuren.`,
          action: { type: "OPEN_URL", url: `https://www.youtube.com/results?search_query=${query}` },
        };
      }
    }

    // Search Google
    if (lowerCommand.includes("search google") || lowerCommand.includes("google la search") || lowerCommand.includes("google search")) {
      const searchMatch = lowerCommand.match(/search\s+google\s+(?:for\s+)?(.+)/i) ||
                          lowerCommand.match(/google\s+la\s+(.+?)\s+search/i) ||
                          lowerCommand.match(/google\s+search\s+(.+)/i);
      
      if (searchMatch && searchMatch[1]) {
        const query = encodeURIComponent(searchMatch[1].trim());
        return {
          response: `Boss, Google-la "${searchMatch[1]}" search pannuren.`,
          action: { type: "OPEN_URL", url: `https://www.google.com/search?q=${query}` },
        };
      }
    }

    // Open Twitter/X
    if (lowerCommand.includes("open twitter") || lowerCommand.includes("twitter open") || lowerCommand.includes("open x")) {
      return {
        response: "Boss, Twitter open pannuren.",
        action: { type: "OPEN_URL", url: "https://twitter.com" },
      };
    }

    // Open LinkedIn
    if (lowerCommand.includes("open linkedin") || lowerCommand.includes("linkedin open")) {
      return {
        response: "Boss, LinkedIn open pannuren.",
        action: { type: "OPEN_URL", url: "https://www.linkedin.com" },
      };
    }

    // Open Instagram
    if (lowerCommand.includes("open instagram") || lowerCommand.includes("instagram open")) {
      return {
        response: "Boss, Instagram open pannuren.",
        action: { type: "OPEN_URL", url: "https://www.instagram.com" },
      };
    }

    // Open WhatsApp
    if (lowerCommand.includes("open whatsapp") || lowerCommand.includes("whatsapp open")) {
      return {
        response: "Boss, WhatsApp Web open pannuren.",
        action: { type: "OPEN_URL", url: "https://web.whatsapp.com" },
      };
    }

    // Unknown command
    return {
      response: "Boss, indha command clear-aa puriyala. Konjam repeat pannunga.",
      action: null,
    };
  }, []);

  // Speak the response
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    synthRef.current.speak(utterance);
  }, []);

  // Execute action
  const executeAction = useCallback((action: JarvisAction) => {
    if (action.type === "OPEN_URL") {
      // Small delay before opening
      setTimeout(() => {
        window.open(action.url, "_blank");
      }, 1500);
    }
  }, []);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setState(prev => ({
        ...prev,
        jarvisResponse: "Boss, speech recognition support illa in this browser.",
      }));
      return;
    }

    // Reset state
    setState(prev => ({
      ...prev,
      isListening: true,
      userCommand: "",
      jarvisResponse: "",
      action: null,
    }));

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      setState(prev => ({ ...prev, userCommand: transcript, isListening: false }));

      // Process the command
      const { response, action } = processCommand(transcript);

      // Small delay before responding
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          jarvisResponse: response,
          action: action ? `ACTION: ${action.type} ${action.url}` : null,
        }));

        speak(response);

        if (action) {
          executeAction(action);
        }
      }, 500);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setState(prev => ({
        ...prev,
        isListening: false,
        jarvisResponse: "Boss, audio capture-la problem. Try again pannunga.",
      }));
    };

    recognitionRef.current.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognitionRef.current.start();
  }, [processCommand, speak, executeAction]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState(prev => ({ ...prev, isListening: false }));
  }, []);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  return {
    ...state,
    toggleListening,
    startListening,
    stopListening,
  };
};

export default useJarvis;
