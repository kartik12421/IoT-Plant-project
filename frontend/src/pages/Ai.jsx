import React, { useEffect, useRef, useState } from "react";

const VoiceAssistant = () => {
  const [status, setStatus] = useState("Click to Talk");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  // ---------------- INIT ----------------
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
      console.log("Speech error:", event.error);

      if (event.error === "not-allowed") {
        setStatus("Mic blocked - Allow permission");
      } else if (event.error === "no-speech") {
        setStatus("No speech detected");
      } else {
        setStatus("Mic Error / Try Again");
      }

      setIsListening(false);
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      setStatus("Thinking...");

      try {
        const res = await fetch("http://localhost:5000/api/voice/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        });

        const data = await res.json();

        console.log("AI Response:", data);

        if (data?.reply) {
          speak(data.reply);
        } else {
          setStatus("No AI response");
        }
      } catch (err) {
        console.log(err);
        setStatus("Server Error");
      }
    };

    recognitionRef.current = recognition;

    // IMPORTANT: unlock speech API (Chrome fix)
    window.speechSynthesis.getVoices();

  }, []);

  // ---------------- START LISTEN ----------------
  const startListening = () => {
    try {
      if (isSpeaking) return;

      const recognition = recognitionRef.current;

      if (!recognition) {
        setStatus("Mic not ready");
        return;
      }

      // Safe restart fix
      recognition.abort();

      setTimeout(() => {
        recognition.start();
      }, 300);

    } catch (err) {
      console.log(err);
      setStatus("Mic Error / Try Again");
    }
  };

  // ---------------- AI SPEAK ----------------
  const speak = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice =
      voices.find((v) => v.lang.includes("hi")) || voices[0];

    if (hindiVoice) {
      speech.voice = hindiVoice;
    }

    speech.onstart = () => {
      setIsSpeaking(true);
      setStatus("AI Speaking...");
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setStatus("Click to Talk");
    };

    window.speechSynthesis.speak(speech);
  };

  // ---------------- UI ----------------
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center gap-10">

      {/* MIC BUTTON */}
      <button
        onClick={startListening}
        className={`
          w-44 h-44 rounded-full text-6xl
          flex items-center justify-center
          text-white shadow-2xl transition-all

          ${
            isListening
              ? "bg-red-500 animate-pulse scale-110"
              : isSpeaking
              ? "bg-green-500 animate-bounce scale-105"
              : "bg-blue-500 hover:scale-110"
          }
        `}
      >
        🎤
      </button>

      {/* STATUS */}
      <h1 className="text-white text-2xl font-semibold text-center">
        {status}
      </h1>

    </div>
  );
};

export default VoiceAssistant;