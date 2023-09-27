const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const multer=require('multer')
const env=require('dotenv')
const studentRoutes = require('./routes/studentRoutes');

const csvRoutes=require('./routes/csvRoutes')

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://rajooadv174:seCVQl9stbxi6mHt@ac-mirna4q-shard-00-00.lhzkbqw.mongodb.net:27017,ac-mirna4q-shard-00-01.lhzkbqw.mongodb.net:27017,ac-mirna4q-shard-00-02.lhzkbqw.mongodb.net:27017/?ssl=true&replicaSet=atlas-tyho0r-shard-0&authSource=admin&retryWrites=true&w=majority").then(() => {
  console.log('DB Connected');
}).catch((err) => {
  console.error('DB Connection Error:', err);
});





// Routes
app.use('/api', studentRoutes);
app.use('/api', csvRoutes);


// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.status(200).json({message:"Working Properly"});
});



