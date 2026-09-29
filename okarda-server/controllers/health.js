const Health = (req, res) => {
  res
    .status(200)
    .send({ code: 200, success: true, message: "Server working perfectly" });
};



export default Health