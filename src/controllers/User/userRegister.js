require("dotenv").config();
const User = require("../../models/User");
const uploadImage = require("../../utils/Cloudinary");

const userRegister = async (req, res) => {
  try {
    const { name, lastName, userName, technologies, email, password } =
      req.body;
    
      
      let result;
      if (req.files && req.files.image) {
        result = await uploadImage(req.files.image.tempFilePath);
        console.log(result.secure_url, "aqui la imagen");
      }



    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      lastName,
      userName,
      technologies,
      email,
      password,
      image: result? result.secure_url : null,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
    console.log(error);
  }
};

module.exports = userRegister;
