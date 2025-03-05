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
      default:'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg',
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
