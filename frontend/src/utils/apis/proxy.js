import https from "https";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${req.url.replace(
      "/api/proxy",
      ""
    )}`;

    const response = await axios({
      method: req.method,
      url: backendUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: undefined, // Remove host to avoid conflicts
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Ignore SSL issues here
      }),
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
