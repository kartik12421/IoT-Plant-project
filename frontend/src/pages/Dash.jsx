import { useEffect, useState, useCallback } from "react";
import {
  Droplets,
  Thermometer,
  Leaf,
  Power,
  Upload,
  AlertTriangle,
  Sun,
} from "lucide-react";
import axios from "axios";

export default function Dash() {
  const [sensorData, setSensorData] = useState(null);
  const [pumpOn, setPumpOn] = useState(false);
  const [image, setImage] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSensorData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/esp/sensor");
      const latestData = res.data.data;
      setSensorData(latestData);
      setPumpOn(latestData?.pump);
    } catch (error) {
      console.error("Sensor fetch error:", error);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(fetchSensorData, 0);
    const interval = setInterval(fetchSensorData, 2000);
    return () => {
      clearTimeout(id);
      clearInterval(interval);
    };
  }, [fetchSensorData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAiSubmit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post("http://localhost:5000/api/ai/predict", formData);
      setAiResult(res.data.result);
    } catch (error) {
      console.error(error);
      alert("AI Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800">
          GreenPulse
        </h1>
        <p className="text-gray-500 mt-1">
          Real-time monitoring + AI plant analysis
        </p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="card">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Droplets className="text-blue-500" size={20} />
            </div>
            <h2 className="text-sm font-medium text-gray-500">Soil Moisture</h2>
          </div>
          <div className="sensor-value text-blue-600">
            {sensorData ? sensorData.moisture : "—"}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              <Thermometer className="text-red-500" size={20} />
            </div>
            <h2 className="text-sm font-medium text-gray-500">Temperature</h2>
          </div>
          <div className="sensor-value text-red-500">
            {sensorData ? `${sensorData.temperature}°C` : "—"}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Sun className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-sm font-medium text-gray-500">Light Sensor</h2>
          </div>
          <div className="sensor-value text-yellow-500">
            {sensorData ? sensorData.light : "—"}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Leaf className="text-green-600" size={20} />
            </div>
            <h2 className="text-sm font-medium text-gray-500">Environment</h2>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">
            {sensorData ? sensorData.environment : "—"}
          </div>
        </div>
      </div>

      {/* Pump Status */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              pumpOn ? "bg-green-50" : "bg-gray-100"
            }`}>
              <Power className={pumpOn ? "text-green-600" : "text-gray-400"} size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Water Pump</h2>
              <p className="text-sm text-gray-400">Automatic irrigation system</p>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            pumpOn
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            {pumpOn ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* AI Plant Detection */}
      <div className="card mb-8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
            <Upload className="text-purple-500" size={20} />
          </div>
          <h2 className="section-title">AI Plant Health Detection</h2>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 transition-colors">
          <Upload className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500 mb-4">
            Upload a plant image for AI diagnosis
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-48 rounded-xl mx-auto mb-4 shadow-md"
            />
          )}

          <button
            onClick={handleAiSubmit}
            disabled={loading}
            className="btn-primary bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Analyze Plant"}
          </button>
        </div>

        {aiResult && (
          <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2.5 mb-4">
              <AlertTriangle className="text-amber-500" size={20} />
              <h3 className="font-semibold text-gray-800">AI Report</h3>
            </div>
            <div className="space-y-2.5">
              {aiResult
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 leading-relaxed"
                  >
                    {line.replace(/\*/g, "")}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm py-6">
        Built by Team-Udaan
      </div>
    </div>
  );
}
