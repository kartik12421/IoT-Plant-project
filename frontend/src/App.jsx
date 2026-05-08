import React, { useEffect, useState } from "react";
import {
  Droplets,
  Thermometer,
  Leaf,
  Power,
  Upload,
  AlertTriangle,
} from "lucide-react";

export default function App() {
  const [pumpOn, setPumpOn] = useState(false);

  useEffect(() => {
  fetch("http://localhost:5000/sensor")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}, []);

  // Dummy Live Data
  const soilMoisture = 68;
  const temperature = 29;
  const humidity = 72;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 to-green-50 p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-green-800">
          🌱 AI Smart Farming Dashboard
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Real-time monitoring + AI plant analysis
        </p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Soil Moisture */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="text-blue-500" size={32} />
            <h2 className="text-2xl font-semibold">Soil Moisture</h2>
          </div>

          <div className="text-6xl font-bold text-blue-600">
            {soilMoisture}%
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-5">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${soilMoisture}%` }}
            ></div>
          </div>

          <p className="mt-4 text-gray-500">
            Current soil water level
          </p>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="text-red-500" size={32} />
            <h2 className="text-2xl font-semibold">Temperature</h2>
          </div>

          <div className="text-6xl font-bold text-red-500">
            {temperature}°C
          </div>

          <p className="mt-5 text-gray-500">
            Environment temperature
          </p>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="text-green-600" size={32} />
            <h2 className="text-2xl font-semibold">Humidity</h2>
          </div>

          <div className="text-6xl font-bold text-green-600">
            {humidity}%
          </div>

          <p className="mt-5 text-gray-500">
            Atmospheric humidity
          </p>
        </div>
      </div>

      {/* Pump Control */}
      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Power className="text-yellow-500" size={35} />

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
            {pumpOn ? "Pump ON" : "Pump OFF"}
          </button>
        </div>
      </div>

      {/* AI Plant Analysis */}
      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-8">
          <Upload className="text-purple-500" size={35} />

          <h2 className="text-3xl font-semibold">
            AI Plant Health Detection
          </h2>
        </div>

        {/* Upload Section */}
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
            className="mb-5 block mx-auto"
          />

          <button className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-8 py-4 rounded-2xl text-lg font-semibold">
            Analyze Plant
          </button>
        </div>

        {/* Prediction */}
        <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle
              className="text-yellow-600"
              size={30}
            />

            <h3 className="text-2xl font-semibold text-yellow-700">
              AI Prediction
            </h3>
          </div>

          <p className="text-2xl font-medium text-gray-800">
            Nitrogen Deficiency Detected 🍂
          </p>

          <ul className="mt-5 list-disc ml-6 text-gray-700 text-lg space-y-2">
            <li>Add nitrogen-rich fertilizer</li>
            <li>Reduce excess watering</li>
            <li>Monitor leaf condition for 3 days</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-lg">
        Built with React + ESP32 + AI 🌿
      </div>
    </div>
  );
}
