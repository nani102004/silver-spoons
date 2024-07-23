const mongoose = require('mongoose')

// const mongoURI = 'mongodb+srv://gofood:ajay123@cluster0.5n5jakq.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'; 
const mongoURI = 'mongodb://gofood:ajay123@ac-90mzqel-shard-00-00.5n5jakq.mongodb.net:27017,ac-90mzqel-shard-00-01.5n5jakq.mongodb.net:27017,ac-90mzqel-shard-00-02.5n5jakq.mongodb.net:27017/gofoodmern?replicaSet=atlas-12hs8p-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
            console.log("connected to mongo");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    // callback(err, data, Catdata);
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }

                })
                // if(err){
                //     console.log(err);
                // } 
                // else{
                //     global.food_items = data;
                // } 
            });
        }
    })
}

module.exports = mongoDB();