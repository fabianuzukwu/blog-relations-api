const express = require('express')
const app = express()
const sequelize = require('./database/database')
const PORT = 9090
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

app.use(express.json())
app.use(userRouter)
app.use(postRouter)



const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log( 'Connection has been established successfully.' );
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`)
        })
    } catch (error) {
        console.error( 'Unable to connect to the database:', error.message);
    }
}

dbConnection()