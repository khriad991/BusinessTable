import React, {Fragment, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {GetProductList} from "../ApiRequest/APIRquest";
import {useSelector} from "react-redux";

const ProductList = () => {

    let [searchKeyword, setSearchKeyword] = useState('0')
    let  [perPage, setperPage] = useState(5)

    useEffect(()=>{
       GetProductList(1,perPage, searchKeyword)
    },[])

    let ALLProduct = useSelector((state)=>(state.product.ALLProduct))
    let Total = useSelector((state)=>(state.product.Total))


    // handlePageClick fpr pagination --------->>>>
    const handlePageClick = (event)=>{
        let pageNo = event.selected;
       GetProductList(pageNo +1, perPage,searchKeyword)
    }

    // perpage Change halhendelare---->>>
    const perPageOnChange = (event)=>{
        setperPage(parseInt(event.target.value))
        GetProductList(1,event.target.value, searchKeyword)
    }


    // search keyword change keyword ----->>>>
    const searchOnChange = (e)=>{
        setSearchKeyword(e.target.value);
        if((e.target.value).length===0){
            setSearchKeyword(0);
            GetProductList(1,perPage,")")
        }
    }

    // handle for search input valuer ---->>>>
    const searchData= ()=>{
        GetProductList(1,perPage,searchKeyword);
    }


    return (
        <Fragment>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <h3>My Product List</h3>
                                        </div>
                                        <div className="col-2">
                                            <select onChange={perPageOnChange} className='form-control mx-2 form-select-sm form-select form-control-xl text-md font-weight-bold'>
                                                <option value="5">5 per page</option>
                                                <option value="10">10 per page</option>
                                                <option value="20">30 per page</option>
                                                <option value="50">50 per page</option>
                                                <option value="100">100 per page</option>
                                                <option value="200">100 per page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input
                                                    onChange={searchOnChange}
                                                    type="text"
                                                    className='form-control form-control-sm'
                                                    placeholder='Search..'
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                                <button onClick={searchData} className='btn btn-outline-primary btn-sm mb-0' type='button'> Serach</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className='table-responsive data-table'>
                                                <table className='table'>
                                                    <thead className='sticky-top bg-white'>
                                                    <tr>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>product</th>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>price</th>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>stock</th>
                                                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>code</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        ALLProduct.map((item   )=>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex px-2">
                                                                        <div>
                                                                            <img src={item.image} className="avatar me-3" alt='avatar'/>
                                                                        </div>
                                                                        <div className='d-flex flex-column justify-content-center '>
                                                                            <h6>{item.title}</h6>
                                                                            <p style={{marginTop:"-8px"}}>{item.category}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="text-xs font-weight-bold mb-0 ">{item.brand}</p>
                                                                    <p className="text-xs font-weight-bold mb-0 ">{item.price} </p>
                                                                </td>
                                                                <td>
                                                                    <p className="badge bg-gradient-success ">{item.stock}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-secondary text-xl-center font-weight-bold">{item.product_code}</p>
                                                                </td>
                                                            </tr>

                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label='page navigation example'>
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Total/perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;