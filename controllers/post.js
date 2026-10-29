const {Post, User} = require('../models')

const createPost = async (req, res) => {
    try {
        const { title, body, niche, userId} = req.body

        const post = await Post.create({
            title,
            body,
            niche,
            userId
        })

        res.status(201).json({
            message: 'Post created successfully',
            data: post
        })
    } catch (error) {
        res.status( 500 ).json( {
            message: error.message
        } ); 
    }
}

const getAllPosts = async ( req, res ) => {
    try {
        const posts = await Post.findAll();

        res.status( 200 ).json( {
            message: `All posts found and the total is ${ posts.length }`,
            data: posts
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getOnePost = async ( req, res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk( id, {
            include: [ {
                attributes: [ 'firstName', 'lastName', 'email' ],
                model: User,
                as: 'Users'
            } ]
        } );

        if ( !post) {
            return res.status( 404 ).json( {
                message: 'Post not found'
            } );
        }

        res.status( 200 ).json({
            message: 'Post found',
            data: post
        });
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const updatePost = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { title, body, niche } = req.body;

        const post = await Post.findByPk( id );
        if ( !post ) {
            return res.status( 404 ).json( {
                message: 'Post not found'
            } );
        }

        const updatedPost = await post.update( { title, body, niche} );

        res.status( 200 ).json( {
            message: 'Post updated successfully',
            data: updatedPost
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const deletePost = async ( req, res ) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk( id );

        if ( !post ) {
            return res.status( 404 ).json( {
                message: 'Post not found'
            } );
        }

        await post.destroy();
        res.status( 200 ).json( {
            message: 'Post deleted Successfully'
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
}