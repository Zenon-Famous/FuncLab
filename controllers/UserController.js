const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importações
const User = require('../models/User');

//helpers
const gerartoken = require('../helpers/Create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class Usercontroller{
    static async newUser(req, res) {
        const {name, password, email, confirmPassword, phone} = req.body

        const buscaUser = await User.findOne({email})

        if(!name){
            return res.status(401).json({mensage:'Digite seu nome'})
        }
        if(!email){
            return res.status(401).json({mensage:'Digite seu email'})
        }
        if(!phone){
            return res.status(401).json({mensage:'Digite seu telefone'})
        }
        if(!password){
            return res.status(401).json({mensage:'Digite sua senha'})
        }
        if(!confirmPassword){
            return res.status(401).json({mensage:'Digite sua confirmação de senha'})
        }
        if(password !== confirmPassword){
            return res.status(401).json({message: 'Digite a mesma senha'})
        }
        if (buscaUser) {
            return res.status(401).json({ message: "E-mail já existe" });
        } 

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt);

try{
        const newUser = await User.create({
            name,
            email,
            phone,
            password: passwordHash,
        });
            gerartoken(newUser, req, res);
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"erro interno"})
    }
    }    

    static async login(req, res){
        const {password, email} = req.body

        const buscarUser = await User.findOne(email)

        if(!email){
            return res.status(401).json({mensage:'Digite seu email'})
        }
        if(!password){
            return res.status(401).json({mensage:'Digite sua senha'})
        }

        if(req.body.email !== buscarUser.email){
            return res.status(401).json({message: 'email inválido'})
        }

        const compare = bcrypt.compare(req.body.password, buscarUser.password)

        if(!compare){
            return res.status(401).json({message: 'senha inválida'})
        }
        try{
            const token = await gerartoken(buscarUser, req, res);
            res.status(200).json({message:'token gerado com sucesso', token: token});

        }catch(err){
            return res.status(500).json({message:'erro interno'})
        }    
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){

            const token = getToken(req.headers.authorization);
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined;
        }else{
            currentUser = null;
        }
        return res.status(500).send({currentUser});
    }
    static async getUser(req, res){
        const id = req.params.id

        const user = await User.findById({id}).select('-password')

        if(!user){
            return res.status(402).json({message: 'Usuário n encontrado'})
        }

        res.status(200).json({ user });
    }
    static async updateUser(req, res){
        const id = req.params.id
        //pegando o id pelo token por segurança
        const token = getToken(req.headers.authorization)
        const user = await getUserByToken(token);

        const {name, password, email, phone, confirmPassword} = req.body

        const userId = await User.findById({_id: user.id})

        if(!userId){
            return res.status(401).json({message: 'Não encontrado'})
        }
        if(!name){
            return res.status(401).json({mensage:'Digite seu nome'})
        }
        user.name = name
        if(!email){
            return res.status(401).json({mensage:'Digite seu email'})
        }

        const userExist = await User.findOne({ email })

        if(email !== user.email || userExist){
            return res.status(401).json({mensage:'Usuário já existe'})
        }

        if(!phone){
            return res.status(401).json({mensage:'Digite seu telefone'})
        }

        const checkpassw = bcrypt.compare(password, userId.password)

        if(!checkpassw){
            return res.status(401).json({mensage:'Senha incorreta'})
        }
        if(!confirmPassword){
            return res.status(401).json({mensage:'Digite sua confirmação de senha'})
        }
        if(password !== confirmPassword){
            return res.status(401).json({message: 'Digite a mesma senha'})
        }

    try{
    
    }catch(err){    
        console.error("erro fodido", err)
        return res.status(500).json({message: 'Erro interno'})
    }
    }
}