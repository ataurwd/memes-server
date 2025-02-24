require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8oded.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    // create databse 
    const memesCollection = client.db("memes").collection("post")

    // to get data from the server
    app.get('/memes', async (req, res) => {
        const memes = await memesCollection.find().toArray();
        res.send(memes);
    });

    // get data base on single id
    app.get("/meme/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) }
      const result = await memesCollection.findOne(query)
      res.send(result);
    })
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Welcome to server');
});
  
app.listen(port);