import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User, { UserDocument } from '../models/User';
import { UserInterface } from '../interfaces/UserInterface';
import UserServices from '../services/UserServices';
import jwt from "jsonwebtoken";
import { variables } from "../config/variables";

/** Don't really need this middleware for now since I have implemented  authorization in the frontend **/
export function isAdministratorMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user }: any = req
  if (user) {
    User.findOne(
      { username: user.username },
      (err: Error, doc: UserInterface) => {
        if (err) throw err
        if (doc?.isAdmin) {
          next()
        } else {
          res.send('sorry only admins can perform this')
        }
      }
    )
  }
  res.send('sorry you are not logged in')
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // checks if user already exists
  const { username, email, password } = req?.body
  if (
    !username ||
    !password ||
    !email ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string'
  ) {
    res.send('invalid values')
    return
  }

  User.findOne({ email }, async (err: Error, doc: UserInterface) => {
    if (err) throw err
    if (doc) res.send('User already exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const token = await UserServices.generateToken(newUser);
      await newUser.save();
      res.send({token, newUser});
    }
  })
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const{username, password} = req.body
    const user = await UserServices.findUserByUsername(username)
    if(user){
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if(!isCorrectPassword){
        return
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username},
        variables.JWT_SECRET, {expiresIn:'30min'}
      );
      res.json({token, ...user});
    }else{
      res.send("user email does not exist");
    }
  }
  catch(e){
  console.log(e);
  }
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  res.send(req.user)
  res.redirect("/")
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await User.find().select('-password'))
}

export async function getSingleUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send(await UserServices.findUserWithId(req.params.userId))
  } catch (e) {
    console.log(e)
  }
}

// export function logoutUser(req: Request, res: Response, next: NextFunction) {
//   req.logout()
//   res.send('successfully logged out')
// }

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await UserServices.delet(req.params.userId)
  res.send('user deleted successfully')
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserServices.updateU(userId, update)
    res.send(updatedUser)
  } catch (e) {
    console.log(e)
  }
}

export async function updateUserByAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId
    const update = req.body
    const updatedUser = await UserServices.updateU(userId, update)
    res.send(updatedUser)
  } catch (e) {
    console.log(e)
  }
}
