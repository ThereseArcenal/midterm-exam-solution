const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3307;


const sequelize = new Sequelize("midterm_db", "root", "password123", {
    host: "localhost",
    dialect: "mysql"
  });
  

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "users", 
  timestamps: false
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});


sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error("❌ Database connection failed:", error));
