const { spawn } = require("child_process");

const PORT = process.env.PORT || 3000;

const servers = [
  {
    name: "dropbox",
    stdio: "npx -y dbx-mcp-server",
    path: "/dropbox",
  },
  {
    name: "gdrive",
    stdio: "npx -y @modelcontextprotocol/server-gdrive",
    path: "/gdrive",
  },
];

// supergateway v3+ supports multiple servers on different paths
const args = [];
for (const srv of servers) {
  args.push("--stdio", `${srv.name}=${srv.stdio}`);
}
args.push("--port", String(PORT));

const proc = spawn("npx", ["-y", "supergateway", ...args], {
  stdio: "inherit",
  env: { ...process.env },
  shell: true,
});

proc.on("error", (err) => console.error("supergateway error:", err));
proc.on("exit", (code) => {
  console.log("supergateway exited with code", code);
  process.exit(code || 1);
});

console.log(`MCP proxy starting on port ${PORT}`);
console.log(`Dropbox SSE: /dropbox/sse`);
console.log(`Google Drive SSE: /gdrive/sse`);
