const express = require('express');
const router = express.Router();
//missed to add models
const Farm = require('../models/farm');
const Product = require('../models/product');



router.get('/', async (req, res) => {

    const allFarms = await Farm.find({});
    // console.log(allProds);
    // res.send('all prods');
    res.render('farms/index', { allFarms });


})

router.get('/new', (req, res) => {
    res.render('farms/new');
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneFarm = await Farm.findById(id).populate('products');
        // oops();
        if (!oneFarm) {
            next(new Error('err line 54'));
        } else {
            console.log(oneFarm);
            
            res.render('farms/show', oneFarm);
        }
    } catch (error) {
        next(error);
    }
})




router.post('/', async (req, res) => {
    // console.log(req.body);
    const { name, city } = req.body;
    const newFarm = new Farm({
        name,
        city,
    })
    const savedNewFarm = await newFarm.save();
    console.log(savedNewFarm);

    res.redirect('/farms');

})

router.get('/:farmId/products/new',async (req,res)=>{
    const {farmId} = req.params;
    const farm=await Farm.findById(farmId);
    // console.log(farm);
    res.render('./products/new',farm);
})

router.post('/:farmId/products',async (req,res)=>{
    const {farmId} = req.params;
    const farm=await Farm.findById(farmId);
    // console.log(farm);
    // console.log(req.body);

    const prod= new Product(req.body);
    prod.farm = farm;
    const product = await prod.save();


    farm.products.push(product);
    await farm.save();

    console.log(farm);
    console.log(product);
    // console.log(prod);
    
    // res.send('aa');
    res.redirect(`/farms/${farm._id}`);

})

router.delete('/:id',async(req,res)=>{
    console.log('del farm');
    
    const {id} = req.params;
    console.log(id);
    
    const farmToDel = await Farm.findByIdAndDelete(id);
    console.log(farmToDel);
    
    res.redirect('/farms');
})

module.exports = router;