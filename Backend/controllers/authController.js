import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import contactUsModel from "../models/contactUsModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
// export const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     //validation
//     if (!email || !password) {
//       return res.status(404).send({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }
//     //check user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Email is not registerd",
//       });
//     }
//     const match = await comparePassword(password, user.password);
//     if (!match) {
//       return res.status(200).send({
//         success: false,
//         message: "Invalid Password",
//       });
//     }
//     //token
//     const token = await JWT.sign(
//       { _id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" } // HR session valid only for 2 hours
//     );

//     res.status(200).send({
//       success: true,
//       message: "login successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         // address: user.address,
//         // role: user.role,
//       },
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in login",
//       error,
//     });
//   }
// };

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check user existence
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } // Token expires in 2 hours
    );

    // Set the token in an HTTP-Only cookie for better security (instead of sending it in the response body)
    res.cookie("token", token, {
      httpOnly: true, // Can't be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure cookie in production (HTTPS)
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token, // Optional: You can also return the token in response for convenience
      expiresIn: "2h", // Expiration time
    });
  } catch (error) {
    console.error(error); // Use a logging library like 'winston' in production
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const contactUsController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!message) {
      return res.send({ message: "Message is Required" });
    }

    //save
    const contactUsInfo = await new contactUsModel({
      name,
      email,
      message,
    }).save();

    res.status(201).send({
      success: true,
      message: "Contact Us information received successfully",
      contactUsInfo,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in processing contact us information",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
