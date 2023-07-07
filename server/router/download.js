const router = require('express').Router();
const fileshare = require("../model/model");

router.get('/:uuid',async(req,res)=>{
    const file = await fileshare.findOne({uuid:req.params.uuid});

    if(!file){
        return res.render('download',{
            error : 'Link has been expired'
        });
    }

    const filePath = `${__dirname}/../../${file.path}`;
    res.download(filePath);
    // download is the inbuilt method to download files ////****easy pesssy */
})

module.exports = router;