const Admin = require("../../models/Admin");
const uploadImage = require("../../utils/Cloudinary");

const registerAdmin = async (req, res) => {
  const { name, email, password, types } = req.body;

  try {
    const result = await uploadImage(req.files.image.tempFilePath);

    const adminFound = await Admin.findOne({ email });

    if (adminFound) {
      return res
        .status(400)
        .json({ message: "El email ya se encuentra registrado" });
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password,
      types,
      image: result.secure_url,
    });

    res.status(201).json({ message: "Admin registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerAdmin;
