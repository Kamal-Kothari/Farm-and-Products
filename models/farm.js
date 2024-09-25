const mongoose = require('mongoose');
const {Schema} = mongoose;
const Product= require('./product');

const farmSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})

// farmSchema.pre('findOneAndDelete',async function(data){
//     console.log('pre');
//     console.log(data);  //no data since running before query 
    
// })

// either use middleware to delete items related to farms or write code in delete /farms/:id 
farmSchema.post('findOneAndDelete',async function(farm){
    console.log('post');
    console.log(farm);

    // await Product.deleteMany({farm: farm._id});
    await Product.deleteMany({_id: {$in : farm.products}});
    console.log('deleting prods also');
    
    
})

const Farm = mongoose.model('Farm',farmSchema);
module.exports = Farm;