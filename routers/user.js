const express = require( 'express' );
const router = express.Router();
const { createUser, getAllUsers, getOneUser, updateUser, deleteUser } = require( '../controllers/user' );

router.post( '/users', createUser );
router.get( '/users', getAllUsers );
router.get( '/users/:id', getOneUser );
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;