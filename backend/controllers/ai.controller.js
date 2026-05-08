import fs from "fs";
import axios from "axios";

export const AIPredictController = async (req, res) => {

  try {



    const file = req.file;

    if (!file) {

      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }


    const imagePath = file.path;

    const imageBase64 = fs.readFileSync(
      imagePath,
      {
        encoding: "base64",
      }
    );



    const prompt = `
You are an AI plant doctor.

Analyze this plant image carefully.

Tell:
1. Plant health condition
2. Disease if any
3. Water condition
4. Nutrient deficiency
5. Fertilizer recommendation
6. Solution

Give clean readable short response.
`;



    const response = await axios.post(

      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",

      {
        contents: [
          {
            parts: [

              {
                text: prompt,
              },

              {
                inline_data: {
                  mime_type: file.mimetype,
                  data: imageBase64,
                },
              },

            ],
          },
        ],
      },

      {
        headers: {
          "Content-Type": "application/json",

          "x-goog-api-key":
            process.env.GEMINI_API_KEY,
        },
      }
    );



    const result =
      response?.data?.candidates?.[0]
        ?.content?.parts?.[0]?.text;



    if (!result) {

      return res.status(500).json({
        success: false,
        message: "AI response empty",
      });
    }



    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "AI Analysis Failed",
    });
  }
};
