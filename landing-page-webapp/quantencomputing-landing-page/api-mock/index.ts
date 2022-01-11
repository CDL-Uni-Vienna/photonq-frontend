// @ts-ignore
if (typeof window !== "undefined") {
  const { worker } = require("./worker");
  console.warn("mocking enabled (browser)");
  worker.start();
} else {
  const { server } = require("./server");
  console.warn("mocking enabled (server)");
  server.listen();
}
