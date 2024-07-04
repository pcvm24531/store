import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "./helpers.mjs";

export default passport.use(
    new Strategy( (username, password, done)=>{
        try {
            const findUser = User.find((user)=>user.userName===username);
            if(!findUser) throw new Error('Usuario no encontrado');
            if(findUser.password !==password) throw new Error('Contraseña inválida');
            done( null, findUser );
        } catch (error) {
            console.log(`Error: ${error}`);
            done(error, null)
        }
    })
);

passport.serializeUser(
    (user, done)=>{
        console.log(`Dentro de SerializeUser`);
        console.log(user);
        done(null, user.id);
    }
);

passport.deserializeUser(
    async (id, done)=>{
        console.log("Dentro de deserializeUser");
        console.log(`deserializeUser Usuario ID: ${id}`);
        try {
            const findUser = await User.findById( (user)=>user.id===id );
            if( !findUser ) throw new Error("Usuario no encontrado");
            done( null, findUser );
        } catch (error) {
            done(error, null)
        }
    }
);