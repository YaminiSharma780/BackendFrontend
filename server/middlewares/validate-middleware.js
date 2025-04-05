const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (e) {
    const status = 422;
    const message = "Please fill all the inputs correctly";
    const extraDetails = e.errors[0].message;
    console.log(e);

    const error = {
      status,
      message,
      extraDetails,
    };

    next(error);
  }
};

module.exports = validate;
