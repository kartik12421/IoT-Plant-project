import React, { useEffect, useState } from "react";
import {
  Droplets,
  Thermometer,
  Leaf,
  Power,
  Upload,
  AlertTriangle,
} from "lucide-react";

import axios from "axios";

export default function App() {

  // ================= STATES =================

  const [pumpOn, setPumpOn] = useState(false);

  const [image, setImage] = useState(null);

  const [aiResult, setAiResult] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= SENSOR FETCH =================

  useEffect(() => {

    fetch("http://localhost:5000/sensor")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

  }, []);

  // ================= DUMMY DATA =================

  const soilMoisture = 68;

  const temperature = 29;

  const humidity = 72;

  // ================= IMAGE STORE =================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

    console.log(file);
  };

  // ================= AI SUBMIT =================

  const handleAiSubmit = async () => {

    try {

      if (!image) {

        alert("Please select image");

        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const res = await axios.post(

        "http://localhost:5000/api/ai/predict",

        formData ,{withCredentials:true}
      );

      console.log(res);

      // AI result set
      setAiResult(res.data.result);

    } catch (error) {

      console.log(error);

      alert("AI Analysis Failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-green-800">
          🌱 AI Smart Farming Dashboard
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Real-time monitoring + AI plant analysis
        </p>

      </div>

      {/* ================= SENSOR CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Soil Moisture */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <Droplets
              className="text-blue-500"
              size={32}
            />

            <h2 className="text-2xl font-semibold">
              Soil Moisture
            </h2>

          </div>

          <div className="text-6xl font-bold text-blue-600">
            {soilMoisture}%
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-5">

            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{
                width: `${soilMoisture}%`,
              }}
            ></div>

          </div>

        </div>

        {/* Temperature */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <Thermometer
              className="text-red-500"
              size={32}
            />

            <h2 className="text-2xl font-semibold">
              Temperature
            </h2>

          </div>

          <div className="text-6xl font-bold text-red-500">
            {temperature}°C
          </div>

        </div>

        {/* Humidity */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <Leaf
              className="text-green-600"
              size={32}
            />

            <h2 className="text-2xl font-semibold">
              Humidity
            </h2>

          </div>

          <div className="text-6xl font-bold text-green-600">
            {humidity}%
          </div>

        </div>

      </div>

      {/* ================= PUMP CONTROL ================= */}

      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6">

        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center gap-4">

            <Power
              className="text-yellow-500"
              size={35}
            />

            <div>

              <h2 className="text-3xl font-semibold">
                Water Pump Control
              </h2>

              <p className="text-gray-500 mt-1">
                Automatic irrigation system
              </p>

            </div>

          </div>

          <button
            onClick={() => setPumpOn(!pumpOn)}
            className={`mt-5 md:mt-0 px-8 py-4 rounded-2xl text-white text-xl font-semibold transition-all duration-300 ${
              pumpOn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >

            {
              pumpOn
                ? "Pump ON"
                : "Pump OFF"
            }

          </button>

        </div>

      </div>

      {/* ================= AI SECTION ================= */}

      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6">

        <div className="flex items-center gap-3 mb-8">

          <Upload
            className="text-purple-500"
            size={35}
          />

          <h2 className="text-3xl font-semibold">
            AI Plant Health Detection
          </h2>

        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center">

          <Upload
            className="mx-auto text-gray-400 mb-5"
            size={60}
          />

          <p className="text-gray-600 text-lg mb-5">
            Upload plant image for AI diagnosis
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-5 block mx-auto"
          />

          {/* Preview */}
          {
            image && (

              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-60 rounded-2xl mx-auto mb-5 shadow-lg"
              />

            )
          }

          {/* Button */}
          <button
            onClick={handleAiSubmit}
            className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-8 py-4 rounded-2xl text-lg font-semibold"
          >

            {
              loading
                ? "Analyzing..."
                : "Analyze Plant"
            }

          </button>

        </div>

        {/* ================= AI RESULT ================= */}

        {
          aiResult && (

            <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8 border border-green-200">

              <div className="flex items-center gap-4 mb-6">

                <AlertTriangle
                  className="text-yellow-500"
                  size={35}
                />

                <h2 className="text-3xl font-bold text-green-800">
                  AI Plant Report
                </h2>

              </div>

              <div className="space-y-4">

                {
                  aiResult
                    .split("\n")
                    .filter(
                      (line) =>
                        line.trim() !== ""
                    )
                    .map((line, index) => (

                      <div
                        key={index}
                        className="bg-green-50 border border-green-100 p-5 rounded-2xl"
                      >

                        <p className="text-gray-700 text-lg leading-8">

                          {
                            line.replace(/\*/g, "")
                          }

                        </p>

                      </div>
                    ))
                }

              </div>

            </div>
          )
        }

      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-12 text-center text-gray-500 text-lg">

        Built with React + ESP32 + AI 🌿

      </div>

    </div>
  );
}
