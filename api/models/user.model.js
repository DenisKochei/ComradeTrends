import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
},{timestamps:true}
//timestamp is used to save the time of creation and the time af update
);

const User = mongoose.model('User',userSchema);

export default User;