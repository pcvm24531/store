import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "./helpers.mjs";

export default passport.use(
    new Strategy( async (username, password, done)=>{
        try {
            const users = await User.find();
            const user = users.find( (user)=>user.userName===username );

            if(!user) throw new Error('Usuario no encontrado');

            if( comparePassword( password, user.password ) ) 
                throw new Error("usuario o contraseña invalido!");

            done( null, user );
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
            const users = await User.find();
            const findUser = users.find( (user)=>user.id===id );
            //const findUser = await User.findById( (id)=>User.id===id );
            if( !findUser ) throw new Error("Usuario no encontrado");
            done( null, findUser );
        } catch (error) {
            done(error, null);
        }
    }
);