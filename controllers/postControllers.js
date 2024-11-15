const db = require('../models');
const Post = db.Post;
const Following = db.Following

const createPost = async (req,res)=>{
    const id_usuario = req.user.id;
    const {titulo,contenido}= req.body;
    if (!id_usuario || !titulo || !contenido){
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try{
        const post = await Post.create({id_usuario, titulo, contenido});
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({
        message: error.message,
        nombre: error.name
        });
    }

};

const listPost = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).send({
                message: "Page and limit must be positive"
            })
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Post.findAndCountAll({
            limit: limit,
            offset: offset
        });

        res.status(200).send({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            itemsPerPage: limit,
            data: rows
        })

    } catch (error) {
        res.status(500).send(error.message);
    }
}


const editPost = async(req, res) => {
    try {
        const post = await Post.update(req.body, {
            where: { id: req.params.id }
        })
        if (post[0]) {
            const postUpdated = await Post.findByPk(req.params.id);
            res.status(200).send({
                message: "Actualizado",
                post: postUpdated
            });
        } else {
            res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
}


const deletePost = async (req,res)=>{
    try{
        const post = await Post.destroy({
            where:{id: req.params.id}
        });
        if (post){
            res.status(200).send({message: "eliminado"});
        
        }else {
            res.status(404).send({message:"Not found"})};
    }catch(error){
        res.status(500).send({message:"Error interno del servidor"});
    }     
    

}


const viewPost = async(req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).send({ message: "Post no encontrado" });
        }
        if (post.id_usuario === req.user.id) {
            
            return res.status(200).send(post);
        }
        const isFollower = await Following.findOne({
            where: {
                id_usuario: post.id_usuario, 
                id_usuario_seguido: req.user.id       
            }
        });
        if (isFollower) {
            
            return res.status(200).send(post);
        } else {
            
            return res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
};














module.exports = { createPost, listPost, editPost, deletePost, viewPost};
