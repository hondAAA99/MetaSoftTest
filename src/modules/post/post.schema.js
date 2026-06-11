import z from 'zod'
import { Types } from 'mongoose'
import { genRules } from '../../common/utils/validationGeneralRules.js'
import {
  allowCommentsEnum,
  LikeCountAvailability,
} from '../../common/enum/post_comment.base.enum.js'
import AvailabilityEnum from '../../common/enum/availablity.enum.js'
export const createPostSchema = {
  body: z.strictObject({
    title: z.string(),
    content: z.string(),
    createdBy: z.string().transform(val => new Types.ObjectId(val)),
  }),
}
export const updatePostSchema = {
  body: z.strictObject({
    content: z.string().optional(),
    title: z.string(),
  }),
}
export const deletePostSchema = {
  params: genRules.shape.id,
}
