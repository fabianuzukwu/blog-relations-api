const express = require( 'express' );
const router = express.Router();
const { createPost, getAllPosts, getOnePost, updatePost, deletePost } = require( '../controllers/post' );

router.post( '/posts', createPost );
router.get( '/posts', getAllPosts );
router.get( '/posts/:id', getOnePost );
router.put( '/posts/:id', updatePost );
router.delete( '/posts/:id', deletePost );



module.exports = router;