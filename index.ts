import { spawn } from "child_process";

console.log("Starting VitePress build...");

const buildProcess = spawn("vitepress", ["build"], {
  stdio: "inherit",
  shell: true,
});

buildProcess.on("close", (code) => {
  if (code === 0) {
    console.log("VitePress build completed successfully!");
  } else {
    console.error(`VitePress build failed with exit code ${code}`);
  }
});

buildProcess.on("error", (error) => {
  console.error("Error starting VitePress build:", error);
});