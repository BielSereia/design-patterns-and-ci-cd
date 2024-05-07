import { DiscountPlan } from '@/plans/discount/discount.plan'
import { Plans } from '@/plans/plans'

export class DiscountFactory {
  private strategies = new Map<Plans, DiscountPlan>()

  constructor(discountPlans: DiscountPlan[]) {
    discountPlans.forEach((discountPlan) => {
      this.strategies.set(discountPlan.getUserPlan(), discountPlan)
    })
  }

  public getStrategy(plan: Plans): DiscountPlan {
    const strategy = this.strategies.get(plan)

    if (!strategy) {
      throw new Error('Invalid plan')
    }

    return strategy
  }
}
