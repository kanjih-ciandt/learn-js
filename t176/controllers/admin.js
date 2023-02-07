const Product = require('../models/product');
// const User = require('../models/user');



exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false, 
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then( product => {
    if (!product) { // if product is null or undefined
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(error => console.log(error));
 
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save()
  .then(result => {
    console.log('Created Product');
    res.redirect('/admin/products');
  }).catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const product = new Product(updatedTitle, updatedImageUrl, updatedDesc, updatedPrice, prodId);
    
  product.save().then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  }).catch(error => console.log(error));
  

    
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then( () => {
      res.redirect('/admin/products');
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then( products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  } ).catch(error => console.log(error));
};
