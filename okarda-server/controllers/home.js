const Home = (req, res) => {
  res.status(200).send({
    code: 200,
    success: true,
    message: "This is the home route of okarda server",
  });
};

export default Home;
