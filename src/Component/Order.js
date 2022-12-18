import { React, useEffect, useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown'
import './Order.css'
import axios from 'axios'
import {lunchItems, snacksItems, juiceItems, beverageItems } from './Temp';


const Order = () => {

    //state variables for storing order-details with their default value
    
    const [ward, setWard] = useState("General")
    const [bed, setBed] = useState("bed-no-1")
    const [orderType,setOrderType] = useState("Lunch")
    var now = new Date();
 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day)
    const [date, setDate] = useState(today)
     console.log(date)
    //state-variables for storing orders
    const [snacks, setSnacks] = useState([])
    const [lunch, setLunch] = useState([])
    const [juice, setJuice] = useState([])
    const [beverage, setBeverage] = useState([])

    //Order
    const [order, setOrder] = useState([])
    const [placeOrder, setPlacedOrder] = useState({})

    const [flag,setFlag] = useState(false)

   


    const handleClick = (e) => {
        e.preventDefault()


        setOrder([...snacks, ...lunch, ...juice, ...beverage])
        
    }

    useEffect(() => {
        let orderObj = {}
        order.map((ele) => orderObj[ele] = 1)
        console.log(orderObj)

        if (orderObj != null) setPlacedOrder(orderObj)

    }, [order])





    const handleQuantityChange = (e) => {

        const { name, value } = e.target

        setPlacedOrder((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })





    }

    const handleDelete = (e) => {

        const val = e.target.id

        let updatedOrder = order.filter((elem) => elem != val)
        // console.log(e.target.value)
        setOrder(updatedOrder)

        delete placeOrder[val]
        // console.log(updatedOrder)
    }

    const handleOrderPlacement = async () => {
           let OrderDetails = {
              Ward: ward,
              Bed:bed,
              Date: date,
              OrderType: orderType,
              order:[placeOrder]
           }

           let response = await axios.post("http://localhost:8000/create",OrderDetails)

           if(response.status==201){
            setWard("General")
            setBed("bed-no-1")
            setDate(today)
            setOrderType("Lunch")
            setSnacks([])
            setLunch([])
            setJuice([])
            setBeverage([])
            setOrder([])
            setPlacedOrder({})
        }
        
            alert("Order Placed !")



           console.log(OrderDetails)
    }

    return (
        <>

            <h3>Food Ordering Application for Hospital</h3>
            
            <div className="container">

                <div className="details">

                    <label htmlFor="ward-selection">Select ward:</label>
                    <select className='select-box' name="for-wards" value={ward} onChange={(e) => setWard(e.target.value)}>
                        <option>General</option>
                        <option>Deluxe</option>
                        <option>CCU</option>
                        <option>ICCU</option>
                        <option>SICU</option>
                    </select>
                 

                    <label htmlFor="bed-selection">Select bed no.:</label>
                    <select className='select-box' name="for-beds" value={bed} onChange={(e) => setBed(e.target.value)}>
                        <option>Bed-no-1</option>
                        <option>Bed-no-2</option>
                        <option>Bed-no-3</option>
                        <option>Bed-no-4</option>
                        <option>Bed-no-5</option>
                        <option>Bed-no-6</option>
                        <option>Bed-no-7</option>
                        <option>Bed-no-8</option>
                        <option>Bed-no-9</option>
                        <option>Bed-no-10</option>
                    </select>
                    
                    <label htmlFor="Order-date">Order date:</label>
                    <input className='date-input' type="date" value={date} min={date} onChange={(e) => setDate(e.target.value)} />

                    <label htmlFor="type-of-order">Ordering for:</label>
                    <select className='select-box' name="order-type" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                    </select>
                  
                </div>

                <hr />

                <div className="menu-container">

                    <div className="menu-items">
                        <h3>Select Items to order :</h3>


                        <div className="item">
                            <label htmlFor="snacks">Snacks: </label>
                            <Multiselect isObject={false} options={snacksItems} onSelect={(e) => setSnacks(e)} onRemove={(e) => setSnacks(e)} />

                        </div>

                        <br />

                        <div className="item">
                            <label htmlFor="lunch-items">Lunch items:</label>
                            <Multiselect isObject={false} options={lunchItems} onSelect={(e) => setLunch(e)} onRemove={(e) => setLunch(e)} />

                        </div>

                        <br />

                        <div className="item">
                            <label htmlFor="juice-items">Juice items:</label>
                            <Multiselect isObject={false} options={juiceItems} onSelect={(e) => setJuice(e)} onRemove={(e) => setJuice(e)} />

                        </div>

                        <br />

                        <div className="item">
                            <label htmlFor="beverage-items">Beverage items:</label>
                            <Multiselect isObject={false} options={beverageItems} onSelect={(e) => setBeverage(e)} onRemove={(e) => setBeverage(e)} />

                        </div>

                        <br />

                        <button className='done-btn' onClick={handleClick}>Done</button>


                    </div>

                    <div className="orders">
                    
                        <h4>Selected items</h4>
                        {
                            order.length === 0 ? <div className='ordered-items'>No items selected</div> :
                                order.map((value, index) =>
                                    <div className='ordered-items' id={index}>
                                        {`${value}`}
                                        <input type="Number" name={value} min="1" defaultValue="1" onChange={handleQuantityChange} />


                                        <button className='delete-button' id={value} onClick={handleDelete}>Delete</button>
                                    </div>
                                )
                        }

                        {order.length > 0 ? <button className='done-btn' onClick={handleOrderPlacement}>Order</button> : " "}
                      
                    </div>

                </div>

            </div>



        </>
    )
}

export default Order