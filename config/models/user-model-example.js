var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    nickName:     String,
    firstName:    String,
    lastName:     String,  
    password:     String,
    email: {
        type:     String, required: 'mandatory email',
        match:    [/.+\@.+\..+/, 'Write a correct email']
    },
    date:          Date 
});

module.exports = mongoose.model('user', userSchema);