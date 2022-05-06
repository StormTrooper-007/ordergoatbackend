import { Request, Response, NextFunction } from 'express'
import Order, { OrderDoc } from '../models/Order'
import { OrderInterface } from '../interfaces/OrderInterface'
import OrderServices from '../services/OrderServices'

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orders } = req.body
    const order = new Order({
      orders,
    })
    await OrderServices.create(order)
    res.send(order)
  } catch (e) {
    console.log(e)
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await OrderServices.deleteById(req.params.movieId)
    res.send('order deleted')
  } catch (e) {
    console.log(e)
  }
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await OrderServices.findAllOrders())
  } catch (e) {
    console.log(e);
  }
}
