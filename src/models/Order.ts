import mongoose, { Document } from 'mongoose'
import { OrderInterface } from 'src/interfaces/OrderInterface'

export type OrderDoc = Document & {
  orders: OrderInterface[]
}

const order = new mongoose.Schema({
  orders: [
    {
      name: String,
      image: String,
      price: Number,
      section: String,
      quantity: Number,
      notes: String,
      table: Number,
      day: String,
      time: String,
      user:String
    },
  ],
})

export default mongoose.model<OrderDoc>('Order', order)
