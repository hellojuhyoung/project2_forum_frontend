// frontend/src/pages/api/proxy/[[...path]].js

import httpProxy from "http-proxy";
import https from "https";

const proxy = httpProxy.createProxyServer({});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req, res) {
  const target = process.env.NEXT_PUBLIC_SERVER_URL; // like https://your-backend

  if (!target) {
    res.status(500).json({ error: "Backend URL not defined" });
    return;
  }

  req.url = req.url.replace(/^\/api\/proxy/, ""); // trim /api/proxy

  proxy.web(req, res, {
    target,
    changeOrigin: true,
    secure: false,
    agent: new https.Agent({ rejectUnauthorized: false }), // ignore self-signed cert error
  });

  proxy.on("error", (err) => {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", details: err.message });
  });
}
