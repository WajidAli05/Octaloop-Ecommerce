const multer = require('multer');

const storage = multer.diskStorage({
    //destination to store the file
    destination: function(req, file , cb){
        cb(null, './profileImages');
    },
    filename:(req, file , cb) =>{
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

//check if the image format is jpeg or png. Reject all other files
const fileFilter = (req , file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
        cb(null, false);
    }
    //for unexpected errors
    else{
        cb(new Error('File format not supported'), false);
    }
    }

//if file is larger than 5MB then reject the file
const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({storage: storage , 
    fileFilter : fileFilter ,
    limits: limits
});

module.exports = upload;