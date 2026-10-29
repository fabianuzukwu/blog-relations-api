const { User, Post } = require( '../models' );

const createUser = async ( req, res ) => {
    try {
        const { firstName, lastName, email, gender } = req.body;

        const user = await User.findOne( { where: { email } } );
        if ( user ) {
            return res.status( 400 ).json( {
                message: `User with Email: ${ email } already exists`
            } );
        }

        const newUser = await User.create( {
            firstName,
            lastName,
            email,
            gender
        } );

        res.status( 201 ).json( {
            message: 'User created successfully',
            data: newUser
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getAllUsers = async ( req, res ) => {
    try {
        const users = await User.findAll();

        res.status( 200 ).json( {
            message: `All users found and the total is ${ users.length }`,
            data: users
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getOneUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk( id, {
            include: [ {
                attributes: [ 'title', 'body', 'niche', 'createdAt' ],
                model: Post,
                as: 'Posts'
            } ]
        } );

        if ( !user ) {
            return res.status( 404 ).json( {
                message: 'User not found'
            } );
        }

        res.status( 200 ).json({
            message: 'User found',
            data: user
        })
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const updateUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, gender } = req.body;

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status( 404 ).json( {
                message: 'User not found'
            } );
        }

        const updatedUser = await user.update( { firstName, lastName, email, gender } );

        res.status( 200 ).json( {
            message: 'User updated successfully',
            data: updatedUser
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const deleteUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk( id );

        if ( !user ) {
            return res.status( 404 ).json( {
                message: 'User not found'
            } );
        }

        await user.destroy();
        res.status( 200 ).json( {
            message: 'User deleted Successfully'
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};