import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Registrar un nuevo usuario
export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({ message: "Este usuario ya existe"});
        }

        //Hashear password antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({name, email, password: hashedPassword, role});
        await user.save();

        res.status(201).json({message: "Usuario registrado satisfactoriamente"});
    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
};

// login 
export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Credenciales inválivas"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Credenciales inválidas"});
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token, user: {id: user._id, name: user.name, email: user.email, role: user.role}})

    } catch (error) {
        res.status(500).json({message: "Error en el servidor"});
    }
};


//get User
export const getUser= async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error en el servidor"});
    }
};