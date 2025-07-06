// frontend/src/pages/api/proxy/[[...path]].js

const httpProxy = require("http-proxy"); // Use require for .js file (CommonJS)

// IMPORTANT: Replace this with your actual Elastic Beanstalk HTTP URL
// e.g., 'http://your-env-name.region.elasticbeanstalk.com'
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a proxy server instance
const proxy = httpProxy.createProxyServer();

// Custom Next.js API route config
export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser to allow http-proxy to handle raw body
    externalResolver: true, // Tells Next.js to not worry about the response being handled by an external resolver (http-proxy)
  },
};

export default function handler(req, res) {
  // Return a promise to ensure the Next.js handler waits for the proxy operation to complete
  return new Promise((resolve, reject) => {
    // Modify the request URL to strip the /api/proxy prefix before forwarding to the actual backend
    // For example, if the request is /api/proxy/auth/profile, we want to hit /auth/profile on the backend
    // req.url = req.url.replace("/api/proxy", "");

    const fullPath = req.url;
    const proxyPathPrefix = "/api/proxy";

    let forwardedPath = "";
    if (fullPath.startsWith(proxyPathPrefix)) {
      forwardedPath = fullPath.substring(proxyPathPrefix.length);
    } else {
      // Fallback in case the prefix somehow isn't there, though it should be due to rewrites
      forwardedPath = fullPath;
    }

    // Ensure the path starts with a single leading slash if it's not empty
    if (forwardedPath && !forwardedPath.startsWith("/")) {
      forwardedPath = "/" + forwardedPath;
    } else if (!forwardedPath) {
      // If the path became empty (e.g., original was just /api/proxy),
      // we might want to default to '/', assuming the backend has a root handler.
      forwardedPath = "/";
    }

    if (forwardedPath.length > 1 && forwardedPath.endsWith("/")) {
      forwardedPath = forwardedPath.slice(0, -1);
    }

    req.url = forwardedPath; // Set the request URL for the proxy to use

    proxy.web(
      req,
      res,
      {
        target: BACKEND_URL,
        changeOrigin: true, // Needed for many APIs to correctly route based on Host header
        selfHandleResponse: false, // Let http-proxy handle piping the response back
      },
      (err) => {
        // Handle proxy errors
        console.error("Proxy Error:", err);
        if (!res.headersSent) {
          // Only send error if headers haven't been sent yet
          res.status(500).json({ error: "Proxy error occurred." });
        }
        reject(err); // Reject the promise on error
      }
    );

    // Resolve the promise when the proxy response is received (or an error occurs)
    proxy.once("proxyRes", () => resolve());
    // The error callback above will also reject the promise
  });
}
