import mongoose, { Document } from 'mongoose';
import { UserInterface } from 'src/interfaces/UserInterface';

// export type UserDoc = Document & {
//   users: UserInterface[]
// }

export type UserDocument = Document & {
  username:string
  email:string
  password:string
  isAdmin:boolean
}

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', user);
