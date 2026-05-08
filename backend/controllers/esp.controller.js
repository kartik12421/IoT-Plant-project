import SensorData from "../model/esp.model.js";

export const esp2Controller = async (req, res) => {

  try {



    const {
      moisture,
      temperature,
      light,
      environment,
      pump
    } = req.body;

    // update latest document
    const data = await SensorData.findOneAndUpdate(

      {},

      {
        moisture,
        temperature,
        light,
        environment,
        pump,
      },

      {
        new: true,
           upsert: true,
        
      }
    );

    // console.log(data)

    res.json({
      success: true,
      data,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }
};


export const getSensorData = async (req, res) => {

  try {

    const sensorData = await SensorData.findOne();

    res.json({
      success: true,
      data: sensorData,
    });

  } catch (error) {

    console.log(error);

  }
};