import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";
import Task from "../models/task.model.mjs";
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },  
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
} 
const userRegister = async (req, res) => {
  try {
    const { name, email, password ,role,adminkey} = req.body;

    /* 1. Validate input */
    if (!name || !email || !password) { 
      return res.status(400).json({
        message: "All fields are required",
      });
    }

  // admin key validation
   console.log(process.env.PASSKEY);
       
   if (role === "admin") {
      if (adminkey !== process.env.PASSKEY) {
        return res.status(403).json({ message: "Invalid admin key" });
      } 
    }



  /* 2. Check if user already exists */
   const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    /* 3. Hash password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* 4. Create user using Sequelize */
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // default role
    });

    /* 5. Send response */
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


   //        user login controller

const userLogin = async (req, res) => { 
  // Login logic to be implemented
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    } 
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    } 
    const token = generateToken(user);
    return res.status(200)
    .set('Authorization', `Bearer ${token}`)
    .json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
}
catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  } 
}

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve user profile", error: error.message });
  }
};


const userTasks = async (req, res) => {
  // Logic to get user tasks
  try {

    const userId = req.user.id;
    // Assuming Task is another Sequelize model
    const tasks = await Task.findAll({ where: { userId } });
    return res.status(200).json({ tasks });
  } 
  catch (error) {
    console.error("Failed to get user Tasks", error);
    return res.status(500).json({ message: "Failed to get user Tasks", error: error.message });
  }
}

export { userRegister,userLogin, getUserProfile ,userTasks };