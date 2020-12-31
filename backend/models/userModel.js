import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      required: false
   }
}, {
   timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

// Password encryption middleware.
// bcrypt.getsalt() return the primise, o we need to use await.
// this will automatically run "pre save", we dont need to bring it to user controller
userSchema.pre('save', async function (next) {
   // mongoose method to check if password has not been modified
   // when we have update profile functionality and have changed email or name, but not password,
   // just skip creating encrypted pwd -> next()
   if (!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User