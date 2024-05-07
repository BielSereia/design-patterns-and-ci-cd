import { ProductEntity } from '@/entities/product.entity'
import { DiscountPlan } from './discount.plan'
import { Plans } from '../plans'

export class ProPlanDiscount implements DiscountPlan {
  getUserPlan(): Plans {
    return Plans.PRO
  }

  calculateDiscount(product: ProductEntity): number {
    return product.price - product.price * 0.3
  }
}
