import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId:{
      type:String,
      required:true,
    },
    content1:{
      type:String,
      required:true,
    },
    content2:{
      type:String,
      required:true,
    },
    title:{
      type:String,
      required:true,
      unique:true,
    },
    image:{
      type:String,
      default:"https://media.istockphoto.com/id/1395313484/vector/blog-on-grey-background-concept-logo-blog-with-letter-o-in-the-form-ring-light-or-rgb-circle.jpg?s=612x612&w=0&k=20&c=q6KgR6PIxjTWZiTctmewl_IdB9UyYd60CRiarTf2vwQ=",
    },
    category:{
      type:String,
      default:'uncategorised'
    },
    slug:{
      type:String,
      required:true,
      unique:true
    }
  },{timestamps:true}
)
const Post = mongoose.model('Post',postSchema);

export default Post;
