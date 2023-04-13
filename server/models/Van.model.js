const { Schema, model } = require("mongoose");

const vanSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        price: {
            type: String,
            required: [true, 'Price is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [20, 'Description has got to have at least 20 characters']
        },
        imageUrl: {
            type: String,
            required: [true, 'Image is required']
        },
        type: {
            type: String,
        },
        host: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Van = model('Van', vanSchema);

module.exports = Van;