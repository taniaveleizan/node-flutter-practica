import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next)=>{
     //obtiene el token del header Authorization
     const token = req.header("Authorization");

     if(!token){
        return res.status(401).json({message: "Acceso denegado. No se ha proporcionado ningun token"});
     };

     try {
        //remover "bearer" del token si esta presente
        const cleanToken = token.replace("Bearer ", "");
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

        //Agrega info del user decodificado a la request
        req.user = decoded;
        next();
     } catch (error) {
        console.log(error);
        res.status(400).json({message:"Token inválido."});
     }
}