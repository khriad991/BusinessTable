const ProductModel = require("../model/ProductModel");

exports.ProductList = async (req,res)=>{
    try{
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.searchKeyword;
        let skipRow = (pageNo - 1 ) * perPage;
        let data;

        if(searchValue !== '0'){
            let searchRgx= {"$regex" :searchValue, "$options":'i'}
            let searchQuery= {$or:[{title:searchRgx},{category:searchRgx},{subcategory:searchRgx}, {brand:searchRgx},{remark:searchRgx}]}
            data= await ProductModel.aggregate([{
                $facet:{
                    Total:[{ $match: searchQuery},{ $count: "count"}],
                    Rows:[{ $match: searchQuery},{ $skip: skipRow},{$limit: perPage}],
                }
            }])
        }else{
            data= await ProductModel.aggregate([{
                $facet:{
                    Total:[{$count:"count"}],
                    Rows:[{$skip:skipRow}, {$limit:perPage}]
                }
            }])

        }
        res.status(200).json({status:"success", data})
    }catch (err) {
        res.status(200).json({status:"fail", error:err})

    }
}