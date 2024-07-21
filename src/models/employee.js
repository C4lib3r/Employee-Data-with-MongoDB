const { Schema, model, mongoose } = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const employeeSchema = new Schema ({


    // Emp ID (PK, Auto Increment), Emp First Name, Emp Last Name, Emp Birth Date, Emp Photo 
    // Emp Joining Date, Created Date, Updated Date, Status (Active/Inactive), is_deleted

    empID:{
        type: Number,
        unique : true,
        required : true
    },
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    birthDate:{
        type : Date,
        required : true
    },
    photo:{
        type : String  // Url as string will be passed
    },
    joiningDate : {
        type : Date,
        required : true
    },
    createdDate : {
        type : Date ,
        default : Date.now()
    },
    updatedDate : {
        type : Date ,
        default : Date.now()
    },
    status:{
        type : String,
        enum : ["Active","Inactive"],
        default : "Active"
    },
    is_deleted:{
        type : Boolean,
        default : false
    }

});



// Added plugin for auto-increment
employeeSchema.plugin(AutoIncrement,{inc_field :  "empID"});

const Employee = model("employees", employeeSchema)

module.exports = Employee;

// export default Employee; // Used only for typescript