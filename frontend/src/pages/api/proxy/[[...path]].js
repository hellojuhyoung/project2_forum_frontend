// frontend/src/pages/api/proxy/[[...path]].js

import https from "https";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

export default function handler(req, res) {
  const target = process.env.NEXT_PUBLIC_SERVER_URL;

  const agent = new https.Agent({
    rejectUnauthorized: false, // ignore self-signed cert error (DEV ONLY)
  });

  proxy.web(
    req,
    res,
    {
      target,
      changeOrigin: true,
      secure: false,
      agent,
    },
    (err) => {
      console.error("Proxy error:", err);
      res.status(500).json({ error: "Proxy failed", detail: err.message });
    }
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
