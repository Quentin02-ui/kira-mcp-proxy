const { spawn } = require("child_process");

const servers = [
  {
    name: "fetch",
    port: 3001,
    command: "npx",
    args: ["-y", "mcp-node-fetch"],
  },
  // Add more servers here as needed
];

for (const srv of servers) {
  const proc = spawn("npx", [
    "-y", "supergateway",
    "--stdio", [srv.command, ...srv.args].join(" "),
    "--port", String(srv.port),
  ], {
    stdio: "inherit",
    env: { ...process.env },
  });

  proc.on("error", (err) => console.error(`${srv.name} error:`, err));
  proc.on("exit", (code) => console.log(`${srv.name} exited with code ${code}`));
  console.log(`Starting ${srv.name} on port ${srv.port}`);
}
