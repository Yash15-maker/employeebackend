const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://mishrayash:uMZn4XIs2DW4y4oA@ecommerce.8pviytr.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true })
}