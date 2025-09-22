import { redisClient } from "../config/redis-config.mjs";

const setValue = async (key, value, timeExpiration = null) => {
    try {
        const stringValue = JSON.stringify(value);
        if (timeExpiration) {
            await redisClient.setEx(key, stringValue, timeExpiration);
        } else {
            await redisClient.set(key, stringValue);
        }
    } catch (err) {
        console.log("No se pudo setear el valor", err)
    }
}


const getValue = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log("No se pudo obtener el valor", err);
    }
}

const deleteValue = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.log("No se pudo borrar el valor", err);
    }
}