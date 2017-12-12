var mongoose = require('mongoose'),
    User = require('../models/user-model-example'),
    bcrypt = require('bcrypt-nodejs');

//GET - ALL USERS
exports.allUsers = (req, res,next) => {
	//Find All User SORT DESC date
	User.find({}).sort({date: -1}).exec( (err, users) => {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(users);
	})
};

//GET - User by ID v
exports.userLogin  = (req, res,next)=> {
    let params   = req.body,
        password = params.password,
        _id = params._id;
    User.findById(_id, (err, user) => {
        if (err)  return res.send(500, err.message);
        if (!user) return res.send(404,err.message);  
        bcrypt.compare(password, user.password, (err, check)=>{
            // if somthing wrong ...
            if(err) return res.send(500, err.message);
            // if the passwords is valid
            if (check) {
                // if the param gethash is send in request we generate the token
                if (params.gethash)  return res.status(200).send({ token: jwt.createToken(user) });
                    // if the gethash is not set we return a user information
                    return res.status(200).send({ user });
            }else { // If password not match
                return res.send({message: 'Some problems in bcrypt'});
            }
        })   
    })
};

//POST - Inser New User
exports.userInsert = (req, res) =>{
	let user    = new User(),
        params  = req.body; 
    console.log(req.body)
    user.nickName   = params.nickName;
    user.firstName  = params.firstName;
	user.lastName   = params.lastName;
	user.password   = params.password;
	user.email      = params.email
    user.role       = 'role_user';
    user.date       = new Date().getTime();
	User.findOne({ userName: user.userName }, (err, userMongo) => {
			if (err) return res.status(500).send(500, err.message)
            if (userMongo) return res.send(500, 'this user is already used')   
            if (!params.password) return res.send(500, 'Mandatory password')   
            if (!user.nickName) return res.send(500, 'Mandatory nickName')

            bcrypt.hash(params.password, null, null, function (err, hash) {
                if(err) return res.send(500, err.message);
                user.password = hash;
                    user.save( (err, userStored) => {
                        if(err) return res.send(500, err.message);
                        if(!userStored) return res.status(404).send({message: 'The user is void'});

                        return res.status(200).send({ message: "Insert Succes!" });             
                    })
				})
			})
};

//PUT - Update User
exports.userUpdate = (req, res) => {
    let params  = req.body,
        _id     = params._id;
        console.log("update", params)
    User.findById(_id, (err, userUpdate) => {
        if (err) return res.status(500).send(500, err.message)
        if (params.nickName)    userUpdate.nickName  = params.nickName
        if (params.firstName)   userUpdate.firstName = params.firstName 
        if (params.lastName)    userUpdate.lastName  = params.lastName 
        if (params.password)    userUpdate.password  = params.password
        if (params.role)        userUpdate.role      = params.role
        if (params.date)        userUpdate.date      = params.date

        console.log("This is the changed user who updates in DB-->",userUpdate)

		userUpdate.save((err) =>{
            if(err) return res.status(500).send(500,err.message);
            
            return res.status(200).jsonp(userUpdate);
		});
	});
};

//DELETE - Delete User
exports.userDelete = (req, res)=> {
    var i_d = req.params._id
	User.findById(_id, (err, userDelete) =>{
        if (err) return res.status(500).send(500, err.message)
		userDelete.remove((err) =>{
			if(err) return res.status(500).send(err.message);
            res.status(200).send(200,"Succesfull Delete");
		})
	});
};