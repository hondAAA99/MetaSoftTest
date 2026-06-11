import mongoose, { Schema, model } from 'mongoose'

export const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
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
