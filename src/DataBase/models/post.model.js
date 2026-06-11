import mongoose, { Schema, model } from 'mongoose'
export const postSchema = new mongoose.Schema({
  title: { type: String },
  content: {
    type: String,
    required: function () {
      return this.attachments ? false : true
    },
  },
  authorId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date },
})

const postModel = mongoose.models.posts || model('posts', postSchema)
export default postModel
