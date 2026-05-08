import React, { useEffect, useState } from "react";
import {
  Droplets,
  Thermometer,
  Leaf,
  Power,
  Upload,
  AlertTriangle,
  Sun,
  Route,
} from "lucide-react";

import axios from "axios";
import { Link } from "react-router-dom";
export default function Dash() {



  const [sensorData, setSensorData] = useState(null);

  const [pumpOn, setPumpOn] = useState(false);

  const [image, setImage] = useState(null);

  const [aiResult, setAiResult] = useState("");

  const [loading, setLoading] = useState(false);



  const fetchSensorData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/esp/sensor"
      );

      console.log("Realtime Sensor Data => ", res.data);

      const latestData = res.data.data;

      setSensorData(latestData);

      setPumpOn(latestData?.pump);

    } catch (error) {

      console.log("Sensor Fetch Error => ", error);

    }
  };



  useEffect(() => {

    fetchSensorData();

  
    const interval = setInterval(() => {

      fetchSensorData();

    }, 2000);

    return () => clearInterval(interval);

  }, []);



  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

  };



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
        formData
      );

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

      {/* <div>
        <Button className="mb-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold">
            voice
        </Button>
      </div> */}


      <div className="mb-10">

        <h1 className="text-5xl font-bold text-green-800">
          🌱 GreenPulse - AI Powered Plant Solution
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Real-time monitoring + AI plant analysis
        </p>

      </div>

  

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  

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

            {
              sensorData
                ? sensorData.moisture
                : "..."
            }

          </div>

        </div>

    

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

            {
              sensorData
                ? `${sensorData.temperature}°C`
                : "..."
            }

          </div>

        </div>

  

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <Sun
              className="text-yellow-500"
              size={32}
            />

            <h2 className="text-2xl font-semibold">
              Light Sensor
            </h2>

          </div>

          <div className="text-6xl font-bold text-yellow-500">

            {
              sensorData
                ? sensorData.light
                : "..."
            }

          </div>

        </div>


        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex items-center gap-3 mb-4">

            <Leaf
              className="text-green-600"
              size={32}
            />

            <h2 className="text-2xl font-semibold">
              Environment
            </h2>

          </div>

          <div className="text-4xl font-bold text-green-600">

            {
              sensorData
                ? sensorData.environment
                : "..."
            }

          </div>

        </div>

      </div>


      <div className="mt-10 bg-white rounded-3xl shadow-xl p-6">

        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="flex items-center gap-4">

            <Power
              className="text-yellow-500"
              size={35}
            />

            <div>

              <h2 className="text-3xl font-semibold">
                Water Pump Status
              </h2>

              <p className="text-gray-500 mt-1">
                Automatic irrigation system
              </p>

            </div>

          </div>

          <button
            className={`mt-5 md:mt-0 px-8 py-4 rounded-2xl text-white text-xl font-semibold transition-all duration-300 ${
              pumpOn
                ? "bg-green-600"
                : "bg-red-500"
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



          {
            image && (

              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-60 rounded-2xl mx-auto mb-5 shadow-lg"
              />

            )
          }



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
                      (line) => line.trim() !== ""
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



      <div className="mt-12 text-center text-gray-500 text-lg">

        Built By Team-Udaan 🌿

      </div>

     

    </div>
  );
}