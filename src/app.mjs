import express from "express"
import "dotenv/config";
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import v1Rutas from "./routes/v1/task.mjs";
import v1Publicas from "./routes/v1/user.mjs";
import { xssSanitizer } from "./middleware/sanitizer-middleware.mjs";

const app = express();
const port = process.env.port ?? 3000;

connectMongo();
connectRedis();

app.use(express.json());

//middelware sanitizado
app.use(xssSanitizer)

app.use("/api/v1", v1Publicas);


app.use("/api/v1/tasks", v1Rutas);


app.use((err, req, res, next) => {
    console.log('err', err)
    if (err.message) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Error no controlado" });
    }

}

)

app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));









