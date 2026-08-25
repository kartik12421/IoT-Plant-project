import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mic } from "lucide-react";
import { Link } from "react-router-dom";

export default function VoiceAssistant() {
  const [status, setStatus] = useState("Tap to speak");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes("hi")) || voices[0];
    if (hindiVoice) speech.voice = hindiVoice;

    speech.onstart = () => {
      setIsSpeaking(true);
      setStatus("AI Speaking...");
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setStatus("Tap to speak");
    };

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("Listening...");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      if (event.error === "not-allowed") {
        setStatus("Mic blocked - Allow permission");
      } else if (event.error === "no-speech") {
        setStatus("No speech detected");
      } else {
        setStatus("Mic error, try again");
      }
      setIsListening(false);
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setStatus("Thinking...");

      try {
        const res = await fetch("http://localhost:5000/api/voice/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();

        if (data?.reply) {
          speak(data.reply);
        } else {
          setStatus("No AI response");
        }
      } catch (err) {
        console.error(err);
        setStatus("Server error");
      }
    };

    recognitionRef.current = recognition;
    window.speechSynthesis.getVoices();
  }, []);

  const startListening = () => {
    if (isSpeaking) return;

    const recognition = recognitionRef.current;
    if (!recognition) {
      setStatus("Mic not ready");
      return;
    }

    recognition.abort();
    setTimeout(() => recognition.start(), 300);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-gray-950 flex flex-col items-center justify-center relative">
      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
      >
        <ArrowLeft size={16} />
        Dashboard
      </Link>

      {/* Branding */}
      <div className="absolute top-6 text-gray-600 text-sm font-medium">
        GreenPulse Voice
      </div>

      {/* Mic Button */}
      <button
        onClick={startListening}
        className={`
          w-40 h-40 rounded-full
          flex items-center justify-center
          shadow-2xl transition-all duration-300
          ${
            isListening
              ? "bg-red-500/90 animate-pulse scale-110"
              : isSpeaking
              ? "bg-green-500/90 animate-bounce scale-105"
              : "bg-blue-500/90 hover:scale-110 active:scale-105"
          }
        `}
      >
        <Mic size={48} className="text-white" />
      </button>

      {/* Status */}
      <h1 className="text-white text-xl font-medium mt-8 text-center">
        {status}
      </h1>
    </div>
  );
}
