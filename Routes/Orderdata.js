const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderdata', async(req,res)=>{
    
    // console.log(req);
    let data = req.body.order_data
    console.log("Request for order");
    console.log(data);
    if (!data) {
        data = [];
      }
    // await data.splice(0,0,{Order_date: req.body.order_date})
    data.unshift({ Order_date: req.body.order_date });

    //if email not exisiting in db then create: else: InsertMany()
    let eId = await Order.findOne({'email': req.body.email})
    console.log(eId)
    if(eId ===null)
    {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success: true})
            }) 
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }


    }
    else{
        try {
            await Order.findOneAndUpdate({email: req.body.email},
                {$push: {order_data: data}}).then(()=>{
                    res.json({success: true})
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderdata', async(req,res)=>{
    try {
        let myData = await Order.findOne({'email':req.body.email})
        if (!myData) {
            // No data found for the provided email, send an empty array
            return res.json({ orderArr: [] });
        }
        let Myarr=myData.order_data;
        Myarr.reverse();

        res.json({orderArr: Myarr})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})
module.exports= router;