function restrictedFields(req, res, next){
    const restrictedFields = ["birthDate", "joiningDate"];
    
    
    restrictedFields.forEach( fields => { 
        if (req.body[fields]){
            return res.status(400).json({ error : `Field ${fields} cannot be updated.`});
        }
    });
    
    next();
};

module.exports = restrictedFields;