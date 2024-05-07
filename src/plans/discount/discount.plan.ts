import { ProductEntity } from '@/entities/product.entity'
import { Plans } from '../plans'

export interface DiscountPlan {
  getUserPlan(): Plans
  calculateDiscount(product: ProductEntity): number
}
