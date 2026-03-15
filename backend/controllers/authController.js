// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// // REGISTER USER

// exports.register = async (req,res)=>{

//   try{

//     const {name,email,password} = req.body;

//     const hashedPassword = await bcrypt.hash(password,10);

//     const user = new User({
//       name,
//       email,
//       password:hashedPassword
//     });

//     await user.save();

//     res.json({
//       message:"User registered successfully"
//     });

//   }

//   catch(error){

//     res.status(500).json(error);

//   }

// };



// // LOGIN USER

// exports.login = async (req,res)=>{

//   try{

//     const {email,password} = req.body;

//     const user = await User.findOne({email});

//     if(!user){
//       return res.status(400).json("User not found");
//     }

//     const isMatch = await bcrypt.compare(password,user.password);

//     if(!isMatch){
//       return res.status(400).json("Wrong password");
//     }

//     const token = jwt.sign(
//       {id:user._id},
//       process.env.JWT_SECRET,
//       {expiresIn:"1d"}
//     );

//     res.json({
//       token,
//       user
//     });

//   }

//   catch(error){

//     res.status(500).json(error);

//   }

// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.log("Register Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// LOGIN USER

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    console.log("Login Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};