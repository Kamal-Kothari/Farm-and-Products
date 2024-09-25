const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmTest')
.then(()=>{
    console.log('connected to db');
    
})
.catch((e)=>{
    console.log('some err',e);
    
})
 async function createOne( ) {
    const p1=new Product({
        name:'tomato',
        price: 2,
        category : 'Fruit'
    })
    try {
        const savedP1 = await p1.save();
        console.log(savedP1);
        
    } catch (error) {
        console.log('err',error);
        
    }
    

}


// createOne();

// Product.insertMany([
//     {
//         name:'cabbage',
//         price: 3.5,
//         category : 'vege'
//     },
//     {
//         name:'milk',
//         price: 4,
//         category : 'dairy'
//     },
//     {
//         name:'apple',
//         price: 3,
//         category : 'fruit'
//     },
//     {
//         name:'lemon',
//         price: 1,
//         category : 'vege'
//     }
// ])
// .then((data)=>{
//     console.log(data);
    
// })
// .catch((e)=>{
//     console.log('err',e);
    
// })

const deleteAll = async ( )=>{
    console.log('deleting all via seed');
    await Product.deleteMany({});
    
}
deleteAll();