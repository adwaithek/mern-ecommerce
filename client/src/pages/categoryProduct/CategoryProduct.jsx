import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/layout/Layout'
import { useNavigate } from 'react-router-dom'









function CategoryProduct() {

    const params = useParams();
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])



    useEffect(() => {
        if (params?.slug) getProductsByCatgry();
    }, [params?.slug])



    const getProductsByCatgry = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category)

        } catch (error) {
            console.log(error);

        }

    }




    return (
        <Layout>
      <div className="container mt-3 category ">
        <h5 className="text-center "  style={{marginTop:"100px"}} >Category - {category?.name}</h5>
        <p className="text-center">{products?.length} result found </p>
        <div className="row">
          <div className="col-md-9  ">
            <div className="d-flex" >
              {products?.map((p) => (
                <div className="card ns-5 m-2" key={p._id} style={{width:"18rem"}}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    
                    style={{width:"18rem",height:"15rem"} }
                   
                    alt={p.name}
                    
                  />
                  <div className="card-body" style={{width:"18rem"}}>
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                    className="btn btn-dark ms-1"
                    // onClick={() => {
                    //   setCart([...cart, p]);
                    //   localStorage.setItem(
                    //     "cart",
                    //     JSON.stringify([...cart, p])
                    //   );
                    //   toast.success("Item Added to cart");
                    // }}
                  >
                    ADD TO CART
                  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
      )
}

export default CategoryProduct