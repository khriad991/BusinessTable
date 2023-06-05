
const express =require("express");
const {ProductList} = require("../controller/ProductController");
const router = express.Router();

router.get("/productList/:pageNo/:perPage/:searchKeyword?" , ProductList)


module.exports = router;