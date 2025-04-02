const Contact = require("../models/contact-model");

const ContactController = async (req, res) => {
  try {
    const { username, email, query } = req.body;

    const newQuery = await Contact.create({
      username,
      email,
      query,
    });
    console.log("New query created:", newQuery);
    return res.status(200).json({ msg: "message sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
};

module.exports = ContactController;
