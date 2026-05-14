const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_directory",
});


// GET ALL + SEARCH + SORT
app.get("/employees", async (req, res) => {
  try {
    const { q, sortBy, order } = req.query;

    let sql = "SELECT * FROM employees";
    let values = [];

    if (q) {
      sql += `
        WHERE name LIKE ?
        OR empId LIKE ?
        OR email LIKE ?
      `;

      values.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    const allowedSort = ["name", "hireDate", "salary"];

    if (sortBy && allowedSort.includes(sortBy)) {
      sql += ` ORDER BY ${sortBy}`;

      if (order === "desc") {
        sql += " DESC";
      } else {
        sql += " ASC";
      }
    }

    const [rows] = await pool.execute(sql, values);

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// CREATE
app.post("/employees", async (req, res) => {
  try {

    const {
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active
    } = req.body;

    const sql = `
      INSERT INTO employees
      (empId, name, email, department, position, hireDate, salary, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(sql, [
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active
    ]);

    res.json({
      message: "Employee added"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// UPDATE
app.put("/employees/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const {
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active
    } = req.body;

    const sql = `
      UPDATE employees
      SET
      empId=?,
      name=?,
      email=?,
      department=?,
      position=?,
      hireDate=?,
      salary=?,
      active=?
      WHERE id=?
    `;

    await pool.execute(sql, [
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active,
      id
    ]);

    res.json({
      message: "Employee updated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// DELETE
app.delete("/employees/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await pool.execute(
      "DELETE FROM employees WHERE id=?",
      [id]
    );

    res.json({
      message: "Employee deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});