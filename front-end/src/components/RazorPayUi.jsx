import React from 'react'
import ProductsComp from './ProductsComp'
import API from '../service/api'
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';

const RazorPayUi = () => {
    const [products, setProducts] = React.useState([])
    const [responseData, setResponseData] = React.useState([])
    const Razorpay = useRazorpay()
    const navigate=useNavigate()
    React.useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        try {

            const res = await API.get('/products')
            setProducts(res.data)
        } catch (err) {
            console.error(err)
        }

    }
    const createOrder =async(id)=>{
        try{
            const res=API.get(`/order/${id}`)
            return res
        }catch(err){console.log(err)}
    }
    const handleBuy = async(id) => {
        const {data} = await createOrder(id);
        const options = {
            key: "rzp_test_QOgXbMITmaM4Bq",
            amount: data.amount,
            currency: data.currency,
            name: "Acme Corp",
            description: data.notes.desc,
            image: "https://example.com/your_logo",
            order_id: data.id,
            handler: (res) => {
                navigate("/success",{state:res})
                // setResponseData(res)
            },
            prefill: {
              name: "Piyush Garg",
              email: "youremail@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          const rzpay = new Razorpay(options);
          rzpay.open()
    }
    return (
        <div>
            <h2>RazorPayUi Example</h2>
            <ProductsComp {...{ products, handleBuy }} />
        </div>
    )
}

export default RazorPayUi