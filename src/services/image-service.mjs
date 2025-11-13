import cloudinary from "../config/cloudinary-config.mjs";

// Helper: detectar mime a partir de los primeros bytes del buffer
const detectMimeFromBuffer = (buf) => {
    if (!buf || buf.length < 4) return null;
    // PNG: 89 50 4E 47
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return "image/png";
    // JPEG: FF D8 FF
    if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return "image/jpeg";
    // GIF: 47 49 46 38
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "image/gif";
    return null;
};

// Subir imagen desde base64 o URL
export const createImage = async (file) => {
    try {
        // si es URL (http/https) dejamos que cloudinary lo maneje
        if (typeof file === "string" && /^(https?:)?\/\//i.test(file)) {
            return await cloudinary.uploader.upload(file, { folder: "vercel_uploads" });
        }

        // si es una data URL (data:image/..;base64,AAAA)
        let dataUri = null;
        if (typeof file === "string" && file.startsWith("data:")) {
            dataUri = file;
        } else if (typeof file === "string") {
            // asumimos que es base64 sin prefijo; intentamos detectar el mime
            // limpiar posibles prefijos/newlines
            const cleaned = file.replace(/^data:\w+\/[a-zA-Z+.-]+;base64,/, "").replace(/\s/g, "");
            const buf = Buffer.from(cleaned, "base64");
            const detected = detectMimeFromBuffer(buf) || "image/jpeg";
            dataUri = `data:${detected};base64,${cleaned}`;
            // opcional: log tamaño
            console.log(`[createImage] detected mime=${detected} size=${buf.length} bytes`);
        } else if (file && file.buffer) {
            // caso multer: file es un objeto con buffer
            const buf = file.buffer;
            const detected = detectMimeFromBuffer(buf) || "image/jpeg";
            dataUri = `data:${detected};base64,${buf.toString("base64")}`;
            console.log(`[createImage] multer buffer detected mime=${detected} size=${buf.length} bytes`);
        } else {
            throw new Error("Formato de imagen no soportado");
        }

        // Validación simple: tamaño mínimo razonable
        const payloadBase64 = dataUri.split(",")[1] || "";
        const payloadSize = Buffer.from(payloadBase64, "base64").length;
        if (payloadSize === 0) throw new Error("Imagen base64 vacía o inválida");

        // Intentar subir
        const result = await cloudinary.uploader.upload(dataUri, { folder: "vercel_uploads" });
        return result;
    } catch (error) {
        // proveer más información en el error para debug
        console.error("Error al procesar/subir imagen:", error);
        throw new Error("Error al procesar/subir imagen: " + (error && error.message ? error.message : String(error)));
    }
};

// Eliminar imagen por public_id
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("Error al borrar la imagen: " + error.message);
    }
};
