require('dotenv').config();
const {hashPassword, comparePassword} = require('../tools/hashPassword');
const User = require('../models/userModel');
const Favorite = require('../models/favoriteModel');
const jwt = require('jsonwebtoken');


module.exports.checkToken = (req, res) => {
    const token = req.cookies.jwt ? req.cookies.jwt : null
    const id = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET) : null;
    if (token) {
        if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            res.json({
                status: true,
                message: "Token valide.",
                id : id
            })
        } else {
            res.json({
                status: false,
                message: "Token invalide."
            })
        }
    } else {
        res.json({
            status: false,
            message: "Token non trouvé."
        })
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", '', {
        maxAge: 1,
    }).send({
        status : true,
        message: "Déconnexion réussie...",
    })
}

module.exports.register = async(req , res) => {
    const { name, lastname, email } = req.body
    const password = req.body.password && req.body.password.length >= 6 ? hashPassword(req.body.password) : null;
    if(!password) {
        res.json({
            status: false,
            message: "Le mot de passe doit faire 6 caractères de long minimum."
        })
    } else {
        try {
            await User.create({
                name: name,
                lastname: lastname,
                email: email,
                password: password
            })
            res.json({
                status: true,
                message: "Utilisateur créé avec succès."
            })
        } catch (error) {
            res.json({
                error
            })
        }
    }
    
}

module.exports.login = async(req, res) => {
    const { email , password } = req.body;

    const user = await User.findOne({email: email});

    try {
        if (user) {
            if (comparePassword(password, user.password)) {
                const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                const maxAge = 3 * 24 * 60 * 60 * 1000;
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge
                }).json({
                    status : true,
                    message: "Connexion réussie...redirection",
                })
            } else {
                res.json({
                    status : false,
                    message: "Email et/ou mot de passe incorrect.",
                })
            }
        } else {
            res.json({
                status : false,
                message: "Email et/ou mot de passe incorrect.",
            })
        }
    } catch(error) {
        res.json({
            error: error
        })
    }
}

module.exports.addFavorite = async(req, res) => {
    const { userid, productid, image_url, calories, nutriscore, brand } = req.body
    const target = await Favorite.findOne({user_id: userid, product_id: productid}).exec();
    try {
        if (userid && productid && !target) {
            Favorite.create({
                user_id: userid,
                product_id: productid,
                image_url: image_url,
                calories: calories,
                nutriscore: nutriscore,
                brand: brand
            })
            res.json({
                status: true,
                message: "Favoris Ajouté avec succès."
            })
        } else {
            res.json({
                status: false,
                message: "Ce produit est déjà dans vos favoris."
            })
        }
    } catch(err) {
        res.json({
            status: false,
            message: err
        })
    }
}

module.exports.removeFavorite = async(req, res) => {
    const {userid, productid} = req.body;
    const target = await Favorite.findOne({user_id: userid, product_id: productid}).exec();
    try {
        if (target) {
            await Favorite.findOneAndRemove({user_id: target.user_id, product_id: target.product_id})
            res.json({
                status: true,
                message: "Favoris supprimé.",
                target: target
            })
        } else {
            res.json({
                status: false,
                message: "Champs incorrects."
            })
        }
    } catch(err) {
        res.json({
            status: false,
            message: err
        })
    }
}

module.exports.getFavorites = async(req, res) => {
    const cookie = req.cookies.jwt
    const userid = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET) : null;
    const favorites = await Favorite.find({user_id: userid}).exec();
    try{
        if (userid && favorites) {
            res.json({
                status: true,
                favorites: favorites
            })
        } else {
            res.json({
                status: false,
                message: "erreur"
            })
        }
    } catch(err) {
        res.json({
            status: false,
            message: err
        })
    }
}