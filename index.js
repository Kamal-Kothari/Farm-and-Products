const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm');
const methodOverride = require('method-override');
// console.dir(path);
const farmRoutes = require('./routes/farm');

const app = express();

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride('_method'));



mongoose.connect('mongodb://127.0.0.1:27017/farmTest2')
    .then(() => {
        console.log('connected to db');

    })
    .catch((e) => {
        console.log('some err', e);

    })

app.get('/', (req, res) => {

    res.send('home page');

})

//farm routes
app.use('/farms',farmRoutes);

//product routes

app.get('/products', async (req, res) => {
    const allProds = await Product.find({}).populate('farm');
    // console.log(allProds);
    // res.send('all prods');
    res.render('products/index', { allProds });
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.get('/products/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneProd = await Product.findById(id).populate('farm');
        // oops();
        if (!oneProd) {
            next(new Error('err line 54'));
        } else {

            res.render('products/show', oneProd);
        }
    } catch (error) {
        next(error);
    }
})

app.post('/products', async (req, res) => {
    // console.log(req.body);
    const { name, price, category } = req.body;
    const newProd = new Product({
        name,
        price,
        category
    })
    const savedNewProd = await newProd.save();
    console.log(savedNewProd);

    res.redirect('/products');

})


//edit
// /products/:id put
app.patch('/products/:id', async (req, res) => {
    //a1
    // const id = req.params.id;
    // const filter={
    //     name: 'dudu',
    // };
    // const update = {
    //     name: 'milky',
    //     price: -2,
    // }
    // const options={
    //     new: true,
    //     runValidators : true,
    // }
    // const updatedProd =  await Product.findOneAndUpdate(filter,update,options);
    // console.log(updatedProd);
    // res.send('updated');

    //a2
    const id = req.params.id;

    // const update = {
    //     // name: 'milky',
    //     price: 100,
    // }
    console.log(req.body);

    const options = {
        new: true,
        runValidators: true,
    }
    const updatedProd = await Product.findByIdAndUpdate(id, req.body, options);
    console.log(updatedProd);
    // res.send('updated');
    res.redirect(`/products/${updatedProd._id}`);


})

app.get('/products/category/:nameOfCategory', async (req, res) => {
    const cate = req.params.nameOfCategory;

    const cateWise = await Product.find({ category: cate });
    console.log(cateWise);
    res.send(cateWise);

})


app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const editProd = await Product.findById(id);
    console.log(editProd);

    res.render('products/edit', editProd);
})

app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    const delProd = await Product.findByIdAndDelete(id);
    console.log(delProd);
    res.redirect('/products');

})

app.use((err, req, res, next) => {
    console.log('some err from line 139', err);
    res.status(401).send('error on 140');

})

app.listen(3000, (req, res) => {
    console.log('Listening on port: 3000');

})