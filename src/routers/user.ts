import express from 'express'
import {
  createUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getSingleUserById,
  isAdministratorMiddleWare,
} from '../controllers/user'

const router = express.Router()

router.get('/', getUsers)
router.get('/user', getUser)
router.get('/:userId', getSingleUserById)
router.put('/:userId', isAdministratorMiddleWare, updateUser)
router.delete('/:userId', isAdministratorMiddleWare, deleteUser)
router.post('/', createUser)
router.post('/login', loginUser)
//router.post('/logout', logoutUser)

export default router;
