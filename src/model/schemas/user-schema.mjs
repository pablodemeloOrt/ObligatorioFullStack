import mongoose, { Types } from "mongoose";
import Plan from "../../constants/plan.mjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true, // convierte a minúsculas
        match: [/.+@.+\..+/, 'Por favor ingresa un email válido'] // regex simple para validar email
    },
    age: { type: Number },
    plan: { type: String, enum: Object.values(Plan), default: Plan.PLUS },
    tipoUsuario: { type: String, enum: ['admin', 'user'], default: 'user' }

}, {
    timestamps: true
})

userSchema.index({ email: 1 }, { unique: true });

export default userSchema;