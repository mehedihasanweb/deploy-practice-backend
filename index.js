// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT;

// // middleware
// app.use(cors());
// app.use(express.json());

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.vggzedk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();

//     const praduct_collection = client.db("productDB").collection("products");

//     app.post("/product", async (req, res) => {
//       const body = req.body;
//       const result = await praduct_collection.insertOne(body);
//       res.send(result);
//     });

//     app.get("/product", async (req, res) => {
//       const result = await praduct_collection.find().toArray();
//       res.send(result);
//     });

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.listen(port, () => {
//   console.log(`Express app listening on port : ${port}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT; // Fallback to port 3000 if PORT is not set

// Middleware
app.use(cors());
app.use(express.json());

// DB_user = mdmehedihasananik111;
// DB_pass = Twq0ikA8MT1foBeE;

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.gwuw88z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(port, uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const product_collection = client.db("productDB").collection("products");

    app.post("/product", async (req, res) => {
      const body = req.body;
      const result = await product_collection.insertOne(body);
      res.send(result);
    });

    app.get("/product", async (req, res) => {
      const result = await product_collection.find().toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}`);
});

module.exports = app;
