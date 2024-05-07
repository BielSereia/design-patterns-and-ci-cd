import { ProductEntity } from '@/entities/product.entity'
import { DiscountPlan } from './discount.plan'
import { Plans } from '../plans'

export class FreePlanDiscount implements DiscountPlan {
  getUserPlan(): Plans {
    return Plans.FREE
  }

  calculateDiscount(product: ProductEntity): number {
    return product.price
  }
}
