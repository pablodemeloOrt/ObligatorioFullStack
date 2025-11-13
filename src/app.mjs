import express from "express"
import "dotenv/config";
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Tasks from "./routes/v1/task.mjs";
import v1Users from "./routes/v1/user.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Projects from "./routes/v1/project.mjs";
import v1Images from "./routes/v1/images.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";
import serverless from "serverless-http";


const app = express();
const port = process.env.port ?? 3000;

connectMongo();


app.use(express.json());

//middelware sanitizado
app.use(xssSanitizer)

// CORS middleware - responde preflight OPTIONS y agrega headers necesarios
app.use((req, res, next) => {
  const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173", "https://obligatorio-full-stack-fe.vercel.app"];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    // Ensure caches differentiate responses by Origin
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
  // If you don't use cookies, it's safe to keep this false; set to true if you plan to send credentials
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    // Respond immediately to preflight
    return res.sendStatus(204);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("API REST con Express y MongoDB");
});

app.use("/api/v1", v1Publicas);

app.use("/api/v1/users", v1Users);

app.use("/api/v1/tasks", v1Tasks);

app.use("/api/v1/projects", v1Projects);

app.use("/api/v1/images", v1Images);


app.get("/api/v1", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando",
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
    console.log('err', err)
    if (err.message) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Error no controlado" });
    }

});

export default app;
//app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));