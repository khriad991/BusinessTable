

exports.ProductList = async (req,res)=>{
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKey;
    let skipRow = (pageNo - 1 ) * perPage;
    let Rows;
    let Total;


}