import { ProductEntity } from '@/entities/product.entity'
import { DiscountPlan } from './discount.plan'
import { Plans } from '../plans'

export class BasicPlanDiscount implements DiscountPlan {
  getUserPlan(): Plans {
    return Plans.BASIC
  }

  calculateDiscount(product: ProductEntity): number {
    return product.price - product.price * 0.15
  }
}
