
// For mongoDB database
const express = require('express')
const mongoose = require('mongoose')
const Employee = require("./models/employee")
const app = express()
const restrictedFields = require("./middleware/restrictaedFields")
const env = require('dotenv')
env.config();
const fs = require('fs')

const port = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//reading JSON file

const readJSONFile = (filepath) => {
    try {
        const rawData = fs.readFileSync(filepath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading or parsing file",error);
        return null;
        
    }
}

app.get('/', (req, res) => {
    res.send('Hellow Employer!')
})

// Get all employee data
app.get("/api/allEmployees", async (req,res) => {
    try {
      const result = await Employee.find();
      res.json({employee : result});
      console.log(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
// Creating new employee data
app.post("/api/allEmployees", async (req,res) => {
    console.log(req.body);
    const employee = new Employee(req.body);
    try {
        await employee.save();
        res.status(201).json({employee});
    } catch (e) {
    res.status(400).json({ error: e.message });
    }
})

// Get data based on employee ID
app.get("/api/allEmployees/:empID",async (req,res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query,
      });
    try {
        const employeeID = req.params.empID;
        const employee = await Employee.findOne({ empID : employeeID });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        console.log(employee)

        res.status(200).json({ employee });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Something went wrong' });
    }

});

// Updating employee data based on employee ID 
// Birth date and Joining date are restricted
// Also can use patch for update 

// Put creates new objects based on given body request data and replaces with match ID
// Patch only updates given fields for matched ID and fields and not an entire object
app.put("/api/allEmployees/:empID",restrictedFields,async(req,res) => {
    try {
        const employeeID = req.params.empID;
        const employee = await Employee.findOneAndUpdate(
        { empID : employeeID },
        req.body,
        {new : true}
    );
    console.log({employee});
    res.status(200).json({employee})
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error : "something went wrong"});     
    }

});


// Get all records based on created date (default filter created date desc)
//    -User can filter the records based on Created Date asc, Status (Active/Inactive)
//    -User can search record based on Name, Birth Date



// funciton for start
// connectiong to mongodb and displaying PORT
const start = async () => {
    try{
        await mongoose.connect(CONNECTION);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`)
        });
    }
    catch(e){
        console.log(e.message);
    }
};


// Starting application
start();
