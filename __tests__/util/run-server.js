import path from "path";
const { fork } = require("child_process");

export const runServer = cb => {
  const serverProcess = fork(path.resolve(__dirname + "/../../index.js"))
  serverProcess.on(
    "message",
    ({ message }) => {
      console.log("server process message", message);
      if (message === "APPLICATION_READY") {
        cb(serverProcess);
      }
    }
  );
};

export const stopServer = serverProcess => {
  return serverProcess && serverProcess.kill();
};
