const { spawn } = require("child_process");

const PORT = process.env.PORT || 3000;
const MCP_COMMAND = process.env.MCP_COMMAND || "npx -y dbx-mcp-server";
const MCP_NAME = process.env.MCP_NAME || "mcp-proxy";

const proc = spawn("npx", [
  "-y", "supergateway",
  "--stdio", `"${MCP_COMMAND}"`,
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

console.log(`${MCP_NAME} proxy starting on port ${PORT}`);
