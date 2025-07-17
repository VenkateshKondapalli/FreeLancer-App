const sendUserBasicInfoController = (req, res) => {
  const userInfo = req.user;
  res.status(200).json({
    isSuccess: true,
    message: "user is valid",
    data: {
      userInfo,
    },
  });
};

module.exports = { sendUserBasicInfoController };
