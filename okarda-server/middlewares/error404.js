const error404 = (req, res, next) => {
  res
    .status(404)
    .send({
      code: 404,
      success: false,
      message: "Path does not exist on the server",
    });


    next()
};


export default error404;