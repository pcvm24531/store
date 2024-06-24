import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "./helpers.mjs";

passport.serializeUser(
    (user, done)=>{
        console.log(`Dentro de SerializeUser`);
        console.log(user);
        done(null, user.id)
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

export default passport.use(
    new Strategy( 
        async (userName, password, done)=>{
            try{
                const findUser = await User.findOne({userName});
                if( !findUser ) throw new Error("Usuario no encontrado");
                if( !comparePassword(password, findUser.password) ) throw new Error("Usuario o Contraseña incorrectos!");
                done(null, findUser);
            }catch(err){
                done( err, null );
            }
        } 
    )
);