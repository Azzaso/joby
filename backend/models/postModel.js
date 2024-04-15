import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

    name: {
      type: String,
      required:true
    },
    image:{
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
}
)

const Post = mongoose.model('Post', postSchema);
export default Post;

