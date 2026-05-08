export const esp2Controller = async (
  req,
  res
) => {

  try {

    console.log(req.body);

    res.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};
