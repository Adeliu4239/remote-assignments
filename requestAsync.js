const axios = require("axios");

const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
  const startTime = new Date();
  axios
    .get(url)
    .then((response) => {
      const endTime = new Date();
      const executionTime = endTime - startTime;
      callback(`Execution time (Callback): ${executionTime} ms`);
    })
    .catch((error) => {
      const endTime = new Date();
      const executionTime = endTime - startTime;
      callback(`Execution time (Callback - Error): ${executionTime} ms`);
      callback(error);
    });
}

function requestPromise(url) {
  const startTime = new Date();
  return axios
    .get(url)
    .then((response) => {
      const endTime = new Date();
      const executionTime = endTime - startTime;
      return `Execution time (Promise): ${executionTime} ms`;
    })
    .catch((error) => {
      const endTime = new Date();
      const executionTime = endTime - startTime;
      return `Execution time (Promise - Error): ${executionTime} ms\n${error}`;
    });
}

async function requestAsyncAwait(url) {
  const startTime = new Date();
  try {
    const response = await axios.get(url);
    const endTime = new Date();
    const executionTime = endTime - startTime;
    console.log(`Execution time (Async/Await): ${executionTime} ms`);
  } catch (error) {
    const endTime = new Date();
    const executionTime = endTime - startTime;
    console.error(`Execution time (Async/Await - Error): ${executionTime} ms`);
    console.error(error);
  }
}

requestCallback(url, console.log);
requestPromise(url).then(console.log);
requestAsyncAwait(url);
