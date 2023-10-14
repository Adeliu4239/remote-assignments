const axios = require("axios");

// 发送 POST 请求
async function sendPostRequest() {
    try {
      const requestData = {
        name: "Johnny",
        email: "johnny@example.com",
        password: "Passw0rd",
      };
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Request-Date": "Tue, 10 Jan 2023 00:43:21 GMT", // 替换为您需要的日期格式
        },
      };
  
      const response = await axios.post("https://35.74.134.49:3000/users", requestData, config);
  
      console.log("POST Response:", response.data);
    } catch (error) {
      console.error("POST Error:", error);
    }
  }

// 发送 GET 请求
async function sendGetRequest() {
    try {
      const userId = 1; // 替换为您要查询的用户ID
      const config = {
        headers: {
          "content-type": "application/json",
          "Request-Date": "Tue, 10 Jan 2023 00:43:21 GMT", // 替换为您需要的日期格式
        },
      };
  
      const response = await axios.get(`http://localhost:3000/users?id=${userId}`, config);
  
      console.log("GET Response:", response.data);
    } catch (error) {
      console.error("GET Error:", error);
    }
  }

sendPostRequest();
// sendGetRequest();
