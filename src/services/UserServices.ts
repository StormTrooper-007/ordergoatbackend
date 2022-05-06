import User, { UserDocument } from '../models/User'
import jwt from "jsonwebtoken";
import {UserInterface} from "../interfaces/UserInterface";

async function delet(userId: string): Promise<UserDocument | null> {
  const foundUser = User.findByIdAndDelete(userId)
  if (!foundUser) {
    console.log(`User ${userId} not found`)
  }

  return foundUser
}

async function updateU(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })
  if (!foundUser) {
    console.log(`User ${userId} not found`)
  }
  return foundUser
}

async function findUserWithId(userId: string): Promise<UserDocument | null> {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    console.log(`user  ${userId} not found`)
  }
  return foundUser
}

async function generateToken(user:Partial<UserDocument>){
  const {id, username, isAdmin} = user;
  const token = jwt.sign({id, username,isAdmin}, 'JWT_SECRET', {
    expiresIn:100
  })
  return token;
}

async function findUserByUsername(username?:string):Promise<UserDocument | null>{
const user = await User.findOne({username});
return user;
}

export default {
  delet,
  updateU,
  findUserWithId,
  generateToken,
  findUserByUsername
}
