import Order, { OrderDoc } from '../models/Order'

async function create(order: OrderDoc): Promise<OrderDoc> {
  return order.save()
}

const deleteById = async (orderId: string): Promise<OrderDoc | null> => {
  const foundOrder = Order.findByIdAndDelete(orderId)
  if (!foundOrder) {
    console.log(`Order ${orderId} not found`)
  }
  return foundOrder
}

async function findAllOrders(): Promise<OrderDoc[]> {
  return Order.find()
}

export default {
  create,
  deleteById,
  findAllOrders,
}
