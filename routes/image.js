var express = require('express');
var router = express.Router();
var Image = require('../models/image.js');
var path =require('path');
var fs = require('fs');
const upload = require("../middleware/upload.js");
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //file exist
        return res.json(file)
    })
})
router.post("/",upload.single("upload"),(req,res)=>{
    res.json({file:req.file})
})

module.exports = router;