import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import bcrypt from "bcrypt";

export default passport.use(
    new Strategy( async (username, password, done)=>{
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const users = await User.find();
            const user = users.find( (user)=>user.userName===username );

            if(!user) throw new Error('Usuario no encontrado');

            /*if(findUser.password !==password) 
                throw new Error('Contraseña inválida');*/
            bcrypt.compare(password, user.password, (err, res)=>{
                if( err ) return done(err);
                if( res === false ) return done(null, false, {msg:'Contraseña incorrecta'});

                done( null, user );
            });
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
            if( !findUser ) throw new Error("Usuario no encontrado");
            done( null, findUser );
        } catch (error) {
            done(error, null);
        }
    }
);