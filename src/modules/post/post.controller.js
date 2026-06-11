import { Router } from 'express'
import { validationMiddleWare } from '../../common/middleware/validation.js'
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from './post.schema.js'
import postServices from './post.services.js'
import { authenticate } from '../../common/middleware/authenticate.js'
const postRouter = Router()
postRouter.post(
  '/create-post',
  validationMiddleWare(createPostSchema),
  authenticate,
  postServices.createPost,
)
postRouter.get('/get-posts', authenticate, postServices.getPosts)
postRouter.patch(
  '/update-post/:postId',
  validationMiddleWare(updatePostSchema),
  authenticate,
  postServices.updatePost,
)
postRouter.delete(
  '/delete-post/:postId',
  validationMiddleWare(deletePostSchema),
  authenticate,
  postServices.deletePost,
)
export default postRouter
