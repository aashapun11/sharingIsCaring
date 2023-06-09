// To be able to see the files and download by receiver which was sent by sender
require('dotenv').config();
const router = require('express').Router();
const fileshare = require("../model/model");

router.get('/:uuid',async(req,res)=>{
    try{
    const file = await fileshare.findOne({uuid : req.params.uuid});
    if(!file){
        return res.render('download', { uuid: req.params.uuid, error : 'Link has been expired'});
    }
    return res.render('download',{
        //sending the necessary data during rendering of the data to the download.ejs so that recieiver get what sender sends to him
        uuid : file.uuid,
        fileName : file.filename,
        fileSize: file.size,
        downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`

        //   http://localhost:3000/files/download/kdjfk833jfd-jhfd8r89448975
    })
    } catch(err){
        return res.render('download',{error : 'Somethig went wrong'});
    }
});

module.exports = router;