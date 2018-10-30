import axios from "axios";
import bcrypt from "bcrypt-nodejs";

export default {
  // Gets all user-specific messes
  getUserMesses: function(reportedUser) {
    return axios.get("/api/messes/" + reportedUser);
  },
  // Gets all messes
  getMesses: function() {
    return axios.get("/api/messes");
  },
  // Gets the mess with the given id
  getMess: function(id) {
    return axios.get("/api/messes/" + id);
  },
  updateMess: function(messData) {
    return axios.put("/api/messes/" + messData.id, messData)
  },
  // Deletes the mess with the given id
  deleteMess: function(id) {
    return axios.delete("/api/messes/" + id);
  },
  // Saves a mess to the database
  saveMess: function(messData) {
    console.log("inside saveMess, messData ", messData);
    return axios.post("/api/messes", messData)
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  getEmail: function(userName) {
    return axios.get("/api/users/" + userName);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userData.password, salt);
    userData.password = hash;
    return axios.post("/api/users", userData);
  }
};
