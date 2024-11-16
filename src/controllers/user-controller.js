import {
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser,
  } from "../models/user-model.js";
  
  // Fetch all users
  export const getUsers = async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (e) {
      console.error("Error in getUsers:", e.message);
      res.status(503).json({ error: "DB error" });
    }
  };
  
  // Fetch a single user by ID
  export const getUserById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await fetchUserById(id);
      if (user) res.json(user);
      else res.status(404).json({ message: "User not found" });
    } catch (e) {
      console.error("Error in getUserById:", e.message);
      res.status(503).json({ error: "DB error" });
    }
  };
  
  // Add a new user
  export const postUser = async (req, res) => {
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Assuming hashing is implemented elsewhere
      };
  
      const id = await addUser(newUser);
      res.status(201).json({ message: "User created", id });
    } catch (e) {
      console.error("Error in postUser:", e.message);
      res.status(503).json({ error: "DB error" });
    }
  };
  
  // Update a user's details by ID
  export const updateUserById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedData = {
        username: req.body.username,
        email: req.body.email,
      };
  
      await updateUser(id, updatedData);
      res.json({ message: "User updated" });
    } catch (e) {
      console.error("Error in updateUserById:", e.message);
      res.status(503).json({ error: "DB error" });
    }
  };
  
  // Delete a user by ID
  export const deleteUserById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await deleteUser(id);
      res.json({ message: "User deleted" });
    } catch (e) {
      console.error("Error in deleteUserById:", e.message);
      res.status(503).json({ error: "DB error" });
    }
  };
  