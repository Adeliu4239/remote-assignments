const mysql = require("mysql2/promise");

const POOL = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "Dylan920901",
  database: "assignment",
});

const poolConnection = async () => {
  try {
    const connection = await POOL.getConnection();
    console.log("connecting successfully\n\n\n\n\n\n\n\n\n");
    return connection;
  } catch (err) {
    console.error("connecting failed");
    throw err;
  }
};

module.exports = poolConnection;
