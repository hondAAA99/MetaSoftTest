import mongoose, { Schema, model } from 'mongoose'

const emailSchema = new Schema({
  data: { type: String },
  availability: {
    type: String,
  },
})

export const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: emailSchema,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: { type: Date },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    toObject: {},
    toJSON: {},
  },
)

userSchema
  .virtual('userName')
  .set(function (value) {
    const [fn, ln] = value.split(' ')
    this.firstName = fn
    this.lastName = ln
  })
  .get(function () {
    return this.firstName + ' ' + this.lastName
  })

const userModel = mongoose.models.users || model('users', userSchema)
export default userModel
