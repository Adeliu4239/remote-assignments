  const express = require("express");
  const mysql = require("mysql2/promise");
  const errorRes = require("../utils/err_message");
  // const poolConnection = require('../../utils/db_connection');

  const router = express.Router();

  const dbPool = mysql.createPool({
    host: "database-1.ckkswjmj68sq.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Dylan920901",
    database: "assignment",
  });

  const nameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const symbolRegex = /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/;

  // sign in
  router.post("/", async (req, res) => {
    try {
      console.log("req.headers:", req.headers);
      console.log("req.body:", req.body);
      if (req.headers["content-type"] !== "application/json") {
        const [errorCode, errorMessage] = errorRes.contentTypeError();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        const [errorCode, errorMessage] = errorRes.emptyInput();
        return res.status(errorCode).json({ error: errorMessage });
      }

      if (!nameRegex.test(name) || !emailRegex.test(email)) {
        if (!nameRegex.test(name)) {
          const [errorCode, errorMessage] = errorRes.invalidNameFormat();
          return res.status(errorCode).json({ error: errorMessage });
        }
        if (!emailRegex.test(email)) {
          const [errorCode, errorMessage] = errorRes.invalidEmailFormat();
          return res.status(errorCode).json({ error: errorMessage });
        }
      }

      if (password.length < 8) {
        const [errorCode, errorMessage] = errorRes.invalidPasswordFormat();
        return res.status(errorCode).json({ error: errorMessage });
      }

      let characterTypeCount = 0;
      if (uppercaseRegex.test(password)) {
        characterTypeCount++;
      }

      if (lowercaseRegex.test(password)) {
        characterTypeCount++;
      }

      if (numberRegex.test(password)) {
        characterTypeCount++;
      }

      if (symbolRegex.test(password)) {
        characterTypeCount++;
      }

      if (characterTypeCount < 3) {
        const [errorCode, errorMessage] = errorRes.invalidPasswordFormat();
        characterTypeCount = 0;
        return res.status(errorCode).json({ error: errorMessage });
      }

      const [existingUser] = await dbPool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        const [errorCode, errorMessage] = errorRes.emailAlreadyExist();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const [result] = await dbPool.query(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
      );

      const user = {
        id: result.insertId,
        name,
        email,
      };

      const requestDate = new Date().toUTCString();

      res.status(200).json({
        data: {
          user,
          "request-date": requestDate,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // query user
  router.get("/", async (req, res) => {
    try {
      if (req.headers["content-type"] !== "application/json") {
        const [errorCode, errorMessage] = errorRes.contentTypeError();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const userId = req.query.id;

      if (!userId) {
        const [errorCode, errorMessage] = errorRes.emptyInput();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const [user] = await dbPool.query(
        "SELECT id, name, email FROM user WHERE id = ?",
        [userId]
      );

      if (user.length === 0) {
        const [errorCode, errorMessage] = errorRes.userNotFound();
        return res.status(errorCode).json({ error: errorMessage });
      }

      const requestDate = req.headers["Request-Date "];

      res.status(200).json({
        data: {
          user: user[0],
          "request-date": requestDate,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;
