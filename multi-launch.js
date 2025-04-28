// multi-launch.js
const { fork } = require("child_process");

const instances = 20; // Adjust as needed

for (let i = 0; i < instances; i++) {
  fork("./app.js");
}
