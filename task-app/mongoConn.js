const { MongoClient ,ObjectId} = require("mongodb");
const connURL = "mongodb://127.0.0.1:27017";
const dbName = "manager-task";

MongoClient.connect(
  connURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to database");
    const db = client.db(dbName);
    db.collection('users').insertOne({
        name:"Piyush",
        age:4
    }).then(result=>console.log('Data Inserted',result.ops)).catch(error=> console.log("error"))
    db.collection("users")
      .insertMany([
        {
          name: "Piyush",
          age: 4,
        },
        {
            name: "Shivansh",
            age: 22,
          },
          {
            name: "Nikhil",
            age: 56,
          },
      ])
      .then((result) => console.log("Data Inserted", result.ops))
      .catch((error) => console.log("error"));

      db.collection('users').findOne({name:'Shivansh'})
      .then(result=>console.log('Data found',result))
      .catch(error=>console.log('Error',error));

      db.collection('users').find({name:'Shivansh'}).toArray()
      .then(result=>console.log('Data found',result))
      .catch(error=>console.log('Error',error));

      db.collection('users').updateOne({_id:new ObjectId('63682ae813c8e74ffc4f25f7')},{$set:{name:'Pooja'}})
      .then(result=>console.log('Updated Data',result.modifiedCount))
      .catch(error=>console.log('Error',error))

      db.collection('users').updateMany({age:22},{$set:{age:21}})
      .then(result=>console.log('Updated Data',result.modifiedCount))
      .catch(error=>console.log('Error',error))

      db.collection('users').deleteOne({_id:new ObjectId('63682ae813c8e74ffc4f25f7')})
      .then(result=>console.log('deleted Data',result.deletedCount))
      .catch(error=>console.log('Error',error))

      db.collection('users').deleteMany({age:22})
      .then(result=>console.log('deleted Data',result.deletedCount))
      .catch(error=>console.log('Error',error))
  }
);
