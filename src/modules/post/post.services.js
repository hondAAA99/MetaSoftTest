import {
  ErrorBadRequest,
  ErrorConflict,
  ErrorInternalServerError,
  ErrorNotFound,
  SuccessResponse,
} from '../../common/utils/globalresponse.js'
import postModel from '../../DataBase/models/post.model.js'
import { randomUUID } from 'crypto'
import { Schema } from 'mongoose'
class postServices {
  constructor() {}
  createPost = async (req, res, next) => {
    const { content, title } = req.body
    const { user } = req
    const post = await postModel.create({
      content: content,
      title,
      authorId: user.id,
    })
    if (!post) ErrorInternalServerError('failed to create post')
    SuccessResponse({ res, data: post })
  }
  getPosts = async (req, res, next) => {
    const posts = await postModel.find()
    SuccessResponse({ res, data: posts })
  }
  updatePost = async (req, res, next) => {
    const { postId } = req.params
    const { user } = req
    const { content, title } = req.body
    const post = await postModel.findOneAndUpdate(
      {
        _id: postId,
        authorId: req?.user?.id,
      },
      {
        title,
        content,
      },
    )
    if (!post) {
      ErrorConflict('post not found or you are not authorized')
    }
    SuccessResponse({ res, data: ' post updated' })
  }
  deletePost = async (req, res, next) => {
    const { user } = req
    const { postId } = req.params
    const post = await postModel
      .findOneAndDelete({ _id: postId, authorId: user.id })
      .catch(err => {
        return ErrorBadRequest('failed to delete post')
      })
    if (!post) return ErrorConflict('there is no post to be updated')
    SuccessResponse({ res, data: 'post deleted' })
  }
}
export default new postServices()
