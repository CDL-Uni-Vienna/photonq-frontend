import { worker } from "./worker";

if (typeof window !== "undefined") {
  console.warn("mocking enabled");
  worker.start();
}
