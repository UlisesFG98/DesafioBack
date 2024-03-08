const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema ({
    user:{
        type:String,
    }, 
    title:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        required:true, 
    }
},
    {
        timestamps:true
    }
)

const Posts = mongoose.model('posts', postsSchema);

module.exports= Posts;
