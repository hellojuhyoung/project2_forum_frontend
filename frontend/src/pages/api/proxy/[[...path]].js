// pages/api/proxy/[[...path]].js

import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_SERVER_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy": "", // remove /api/proxy from the path
  },
  secure: false, // allow self-signed cert
});

export default function handler(req, res) {
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
