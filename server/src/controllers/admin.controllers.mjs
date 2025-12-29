import Task from "../models/task.model.mjs";
import User from "../models/user.model.mjs";


const getAllUsers= async (req,res)=>{
  try {
    // Logic to get all users
     const users= await User.findAll();
   
    res.status(200).json({ message: "All users retrieved successfully", users });
  } catch (error) { 
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
    }
};


const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Check if user exists
    console.log(assignedTo)
    const user = await User.findOne({where: {id:assignedTo}});
    
    if (!user) {
      return res.status(400).json({ message: "Assigned user does not exist" });
    }

    // Create the task
    const task = await Task.create({
      title,
      description,
      userId: assignedTo
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};



// controllers/task.controller.mjs
 

 const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks including the assigned user's name
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"], // Only select necessary fields
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Optional: format the response
    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      assignedUser: task.User ?    task.User.name  : null,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    res.status(200).json({
      success: true,
      tasks: formattedTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};


 

  const  updateTaskStatus=async(req,res)=>{
    try { 
      // Logic to update task status 
      const id = req.params.id; 
        const {  status } = req.body;  
        const task = await Task.findByPk(id);
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        await task.update({ status });
        res.status(200).json({ message: "Task status updated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Failed to update task status", error: error.message });
      }
    };

export {getAllUsers,createTask,getAllTasks,updateTaskStatus};