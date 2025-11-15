import { useEffect, useRef, useState } from "react";

export const useVoiceRecognition = (language = "en-IN") => {
  const recognitionRef = useRef(null);

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      console.log("🎙 Listening...");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("🎤 Result:", text);
      setTranscript(text);
    };

    recognition.onend = () => {
      console.log("🛑 Voice stopped");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [language]);

  /** START */
  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      setTranscript("");
      recognitionRef.current.start();
    } catch (err) {
      console.log("Already listening...");
    }
  };

  /** STOP */
  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
  };
};
