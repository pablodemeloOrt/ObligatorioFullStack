import User from "../../model/user.mjs";



const userMongoRepository = {

    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            console.log('No se pudo crear el usuario en mongo', error)
        }
    },


    //obtiene todos los usuario ( quizas un admin)
    async getUsers() {
        return User.find();
    },

    //posiblemente para obtener datos de un usuario
    async getUserById(data) {
        return User.findById(data).select("-password");
    },

    //necesitamos el usuario con su password
    async getUserByEmail(data) {
        console.log('data', data)
        return User.findOne(data);
    },


    //actualiza el usuario
    async updateUser(data) {
        return User.findByIdAndUpdate(data);
    },

    //actualiza el usuario
    async upgradePlan(data) {
        try {
            const { _id } = data;
            const user = await User.findById(_id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            // Solo permitir cambio si el plan actual es 'plus'
            if (user.plan !== 'plus') {
                throw new Error("Solo puedes cambiar de plan si tu plan actual es 'plus'");
            }
            user.plan = 'premium';
            await user.save();
            // No devolver el password
            const userObj = user.toObject();
            delete userObj.password;
            return userObj;
        } catch (error) {
            console.log('No se pudo actualizar el plan del usuario en mongo', error);
            throw error;
        }
    }
};

export default userMongoRepository;