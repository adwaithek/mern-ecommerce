import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout/Layout'
import { useCart } from '../../context/Cart'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function CartPage() {


  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setclientToken] = useState("")
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false)


  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1)
      setCart(myCart);
      localStorage.setItem("Cart", JSON.stringify(myCart))
      toast.success('Succesfully removed')

    } catch (error) {
      console.log(error);
    }

  }

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total
        .toLocaleString("en-US", {
          style: "currency", currency: "USD"
        })


    } catch (error) {
      console.log(error);
    }

  }

  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token')
      setclientToken(data?.clientToken)

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    getToken()
  }, [auth?.token])



  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce, cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success("Payment completed successfully")
    } catch (error) {
      console.log(error);
    }


  }



  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length ? ` You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map(p => (
              <div className="row m-2 card flex-row">
                <div className="col-md-4">
                  <img src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top" alt="" width="100px" heigh='150px'
                  />
                </div>
                <div className="col-md-8">
                  <h4 className='mt-4'>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <button className='btn btn-outline-danger' onClick={removeCartItem}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h3>Cart Summary</h3>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h6>Current Address</h6>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {
                !clientToken || !auth?.token || !cart?.length ? ("") : (

                  <>
                    <DropIn options={{ authorization: clientToken, paypal: { flow: 'vault' } }} onInstance={instance => setInstance(instance)} />


                    <button className="btn btn-primary" onClick={handlePayment} >{loading ? "Processing......" : "Make Payment"}</button>

                  </>


                )
              }

            </div>

          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CartPage