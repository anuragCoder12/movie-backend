const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    role: {
        type: String, 
        default: 'user'
    }
}, { timestamps: true })

// satic sign-up method
userSchema.statics.signUp = async function (userName, email, password, role = 'user'){
    // validate
    if( !userName){
        throw Error(' please provide username ')
    }
    if( !email){
        throw Error(' please provide email ')
    }
    if( !password){
        throw Error(' please provide password ')
    }
    if(!validator.isEmail(email)){
        throw Error('please provide an valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong')
    }
    const exist = await this.findOne({email})
     if(exist){
        throw Error('email already exists')
     }
     const userExist = await this.findOne({userName})
     if(userExist){
        throw Error ('username already taken')
     }
    
    const salt = bcrypt.genSaltSync(10);
    
    const hash = bcrypt.hashSync(password, salt);
    const user = await this.create({userName, email, password:hash, role})
    return user
}
// static login method
userSchema.statics.logIn = async function(userName, password) {
    const user = await this.findOne({userName})
    if(!user){
        throw Error("User not found")
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error(" invalid password ")
    }
    return user
}
 
module.exports = mongoose.model('User', userSchema)