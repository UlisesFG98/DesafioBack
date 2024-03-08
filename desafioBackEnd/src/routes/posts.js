const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/auth');
const Posts = require('../models/postsModel');
const User = require('../models/usersModel');

// Get - Todas las publicaciones
router.get('/', async (req, res)=>{
    try{
        const posts = await Posts.find();
        res.send({message: 'Posts', data:posts});
    }
    catch (error){
            res.status(400).send({message:error});
    }
})

router.get('/search/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        const post = await Posts.find({_id:id});
        res.send({message:'All messages', data: post});
    }
    catch(error){
        res.status(400).send({message:error});
    }
})

// Post - Publicación nueva
router.post('/', async(req, res) => {
    try {    
        let post = req.body;
        const newPost = await Posts.create(post);
        await newPost.save();
        res.status(201).send({message: "Post created", data: newPost});
    } catch (error) {
        res.status(400).send({message: error});
    }
})

// Put - actualiza publicaciones
router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const post = req.body;
        const posts = await Posts.findByIdAndUpdate(id, post, {returnOriginal:false});
        await Posts.findByIdAndDelete(id);
        res.send({message:'Post modified', data:posts});
    }
    catch(error){
        res.status(400).send({message:error});
    }
})

// Delete - Elimina publicaciones
router.delete('/:id', async (req, res)=>{
    try{
        const{id} = req.params;
        await Posts.findByIdAndDelete(id);
        res.send({message:"Message deleted"});
    }
    catch(error){
        res.status(400).send({message:error});
    }
})

module.exports = router;