const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vickybijarniyaciv20:V1bmongo@cluster0.xs6kngz.mongodb.net/gofoodmern'
// const mongoURI ='mongodump --uri mongodb+srv://vickybijarniyaciv20:V1bmongo@cluster0.xs6kngz.mongodb.net/gofoodmern';
mongoose.set('strictQuery', true);
// const User = require('./models/User');
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // console.log(result.models);
        if (err) console.log("---", err)
        else {
            console.log("connected");
            // const db = mongoose.connection.useDb('gofoodmern');
            // console.log(db);
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodcategory = await mongoose.connection.db.collection("foodCategory");
                foodcategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        // console.log(data);
                        global.food_items = data;
                        console.log("printing Data")
                        console.log(data)
                        console.log(food_items)
                        // console.log(catData);
                        global.foodCategory =catData;
                    }
                })


                // if(err) console.log(err);
                // else
                // {
                //     global.food_items = data;

                // }
            })
        }
    });
}

module.exports = mongoDB;

