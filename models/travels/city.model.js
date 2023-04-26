const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema(
    {
        
        nameCity : {
            type: String,
            required: true,

        },
        codeIataCity : {
            type: String,
            required: true,
            unique : true

        },
        codeIso2Country : {
            type: String,
            required: true,
            unique : true
        }
       
        

    },
    { timestamps: true },
)
const City = mongoose.model('City', CitySchema)

module.exports = City