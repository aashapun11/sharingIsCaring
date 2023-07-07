const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fileshare = require("../model/model");
const {v4: uuid4} = require('uuid');



let storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, 'uploads/'), //in cb there are two parameters 1st to manage errors and 2nd to define the destination for the uploading the files
    filename : (req, file, cb) =>{
        // Assigning the uniqueName
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit : {fileSize : 1000000*100} //1MB = 1000000 
}).single('myfile');

//To send the files from POSTMAN so that users can see the url link like this way //http://localhost:3000/files/478989dhjfdh-y47487dhf
router.post('/',(req,res)=>{
   
    //Validate request
    //Store the files
upload(req, res, async(err)=>{
    
    if(!req.file){
        return res.json({error : "All fields are required"});
    }

    if(err){
        return res.status(500).send({error:err.message})
    }
        //To store the data into database
        const file = new fileshare({
            filename : req.file.filename,
            uuid :  uuid4(),
            path : req.file.path,
            size : req.file.size
        })
        const response = await file.save();
        return res.render('share', {
            link : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            uuid : file.uuid
        });

        //http://localhost:3000/files/478989dhjfdh-y47487dhf (Client will see like this way as a download page)

})

    //Respose -> Link
})


//Sending the files via links
router.post('/send',async(req,res)=>{
   
    const {uuid, emailTo, emailFrom} = req.body;

    // validate request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({error : "All fields are required"})
    }

    //Get data from database
    const file = await fileshare.findOne({uuid : uuid});

    //Checking weather we have send this receiver previosuly or not
    // if(file.sender){
    //     return res.status(422).send({error : "Email already Sent"});
    // }


    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    //Send email
    const sendMail = require('../services/emailServices');
    sendMail({
        from : emailFrom,
        to : emailTo,
        subject : "Aasha Paija Filesharing",
        text : `${emailFrom} shared a file with you.`, 
        html : require('../services/emailTemplate')({
            emailFrom : emailFrom,
            downloadLink : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size : parseInt(file.size/1000)+ ' KB',
            expires : '24 hours'
        })
    });

    return res.redirect('/');
})

module.exports = router;