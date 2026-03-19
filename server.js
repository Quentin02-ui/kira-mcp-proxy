const { spawn } = require("child_process");

const PORT = process.env.PORT || 3000;

const proc = spawn("npx", [
  "-y", "supergateway",
  "--stdio", "npx -y dbx-mcp-server",
  "--port", String(PORT),
], {
  stdio: "inherit",
  env: { ...process.env },
  shell: true,
});

proc.on("error", (err) => console.error("supergateway error:", err));
proc.on("exit", (code) => {
  console.log("supergateway exited with code", code);
  process.exit(code || 1);
});

console.log(`Dropbox MCP proxy starting on port ${PORT}`);
