import z from 'zod'
import { Types } from 'mongoose'
import { genRules } from '../../common/utils/validationGeneralRules.js'
import {
  allowCommentsEnum,
  LikeCountAvailability,
} from '../../common/enum/post_comment.base.enum.js'
import AvailabilityEnum from '../../common/enum/availablity.enum.js'
import { ErrorBadRequest } from '../../common/utils/globalresponse.js'
export const createPostSchema = {
  body: z
    .strictObject({
      title: z.string().optional(),
      content: z.string().optional(),
    })
    // .refine(data => {
    //   if (!data.content && !data.title) {
    //     return ErrorBadRequest(
    //       'you need to update at least once title or content of the post',
    //     )
    //   }
    // }),
}
export const updatePostSchema = {
  body: z.strictObject({
    content: z.string().optional(),
    title: z.string(),
  }),
}
export const deletePostSchema = {
  params: z.object({ postId: genRules.shape.id }),
}
