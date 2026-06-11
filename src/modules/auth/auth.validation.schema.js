import zod from 'zod';
import { genRules } from '../../common/utils/validationGeneralRules.js';
import { confirmEmailFlagEnum, roleEnum, } from '../../common/enum/user.base.enum.js';
import mailEnum from '../../common/enum/mail.enum.js';
export const signUpSchema = {
    body: zod
        .object({
        userName: zod.string(),
        email: zod.email(),
        passwordSchema: genRules.shape.passwordSchema,
    })
        .superRefine((data, ctx) => {
        if (data.BirthDate &&
            Number(new Date(data.BirthDate).getTime()) < Date.now()) {
            ctx.addIssue({
                code: zod.z.ZodIssueCode.custom,
                message: 'invalid Date',
                path: ['BirthDate'],
            });
        }
    }),
};
export const signInSchema = {
    body: zod.object({
        email: zod.email(),
        password: zod.string(),
    }),
};
