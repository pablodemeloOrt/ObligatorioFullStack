import express from "express"
import "dotenv/config";
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Tasks from "./routes/v1/task.mjs";
import v1Users from "./routes/v1/user.mjs";
import v1Publicas from "./routes/v1/public.mjs";
import v1Projects from "./routes/v1/project.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";
import serverless from "serverless-http";


const app = express();
const port = process.env.port ?? 3000;

connectMongo();
connectRedis();

app.use(express.json());

//middelware sanitizado
app.use(xssSanitizer)

app.get("/", (req, res) => {
  res.send("API REST con Express y MongoDB");
});

app.use("/api/v1", v1Publicas);

app.use("/api/v1/users", v1Users);

app.use("/api/v1/tasks", v1Tasks);

app.use("/api/v1/projects", v1Projects);


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

}



)

export const handler = serverless(app);
//app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));









