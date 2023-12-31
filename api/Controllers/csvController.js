const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('fast-csv');
const MongoClient = require('mongodb').MongoClient;
const Student = require('../models/student');
const path=require('path');
const student = require('../models/student');


// const csvFilePath=path.join(__dirname,'../','dummy.csv')
// exports.csvUpload=async  (req,res)=> {
//   try {
//     // const userPath=(req.file)
//     const results = [];

//     fs.createReadStream(csvFilePath)
//       .pipe(csv.parse({ headers: true }))
//       .on('data', (row) => results.push(row))
//       .on('end', () => {
//         let result = (JSON.stringify(results, null, 2)); // Print JSON data to the console
//         student.insertMany(JSON.parse(result));
//         res.status(200).json({message:"CSV DATA Saved into DB"})
//       })
//       .on('error', (error) => {
//         console.error('Error reading or processing CSV data:', error);
//       });
//   } catch (error) {
//     console.error('Error reading or processing CSV data:', error);
//   }
// }
// /////////////
// const { path: filePath, originalname } = req.file;

// --------------
exports.csvUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { path: filePath, originalname } = req.file;
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => results.push(row))
      .on('end', () => {
        const result = JSON.stringify(results, null, 2); 

        
        student.insertMany(JSON.parse(result))
          .then((docs) => {
            res.status(200).json({ message: 'CSV data saved into DB', insertedDocs: docs });
          })
          .catch((err) => {
            console.error('Error inserting data into the database:', err);
            res.status(500).json({ message: 'Error saving data to the database' });
          });
      })
      .on('error', (error) => {
        console.error('Error reading or processing CSV data:', error);
        res.status(500).json({ message: 'Error reading or processing CSV data' });
      });
  } catch (error) {
    console.error('Error reading or processing CSV data:', error);
    res.status(500).json({ message: 'Error reading or processing CSV data' });
  }
};



