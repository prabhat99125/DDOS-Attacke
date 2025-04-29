// multi-launch.js
const { fork } = require("child_process");

const instances = 6; // 1 per vCPU (safe for your VPS)

for (let i = 0; i < instances; i++) {
  fork("./app.js");
}
