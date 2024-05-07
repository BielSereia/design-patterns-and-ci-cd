import { ProductsLocalDatabase } from '@/database/products.local.database'
import { UsersLocalDatabase } from '@/database/users.local.database'
import { CalculateDiscountDTO } from '@/dtos/calculate.discount.dto'
import { ProductBuilder } from '@/entities/product.entity'
import { DiscountFactory } from '@/factories/discount.factory'
import { BasicPlanDiscount } from '@/plans/discount/basic.plan.discount'
import { DiscountPlan } from '@/plans/discount/discount.plan'
import { FreePlanDiscount } from '@/plans/discount/free.plan.discount'
import { ProPlanDiscount } from '@/plans/discount/pro.plan.discount'

export class CalculateDiscountService {
  private static instance: CalculateDiscountService
  private discountPlans: DiscountPlan[] = []
  private discountFactory: DiscountFactory

  constructor() {
    this.discountPlans.push(new FreePlanDiscount())
    this.discountPlans.push(new BasicPlanDiscount())
    this.discountPlans.push(new ProPlanDiscount())
    this.discountFactory = new DiscountFactory(this.discountPlans)
  }

  public static getInstance(): CalculateDiscountService {
    if (!CalculateDiscountService.instance) {
      CalculateDiscountService.instance = new CalculateDiscountService()
    }

    return CalculateDiscountService.instance
  }

  execute(data: CalculateDiscountDTO): ProductBuilder {
    const user = UsersLocalDatabase.getInstance()
      .getDatabase()
      .find((user) => user.email === data.email)

    if (!user) {
      throw new Error('User not found')
    }

    const product = ProductsLocalDatabase.getInstance()
      .getDatabase()
      .find((p) => data.product === p.name)

    if (!product) {
      throw new Error('Product not found')
    }

    const discount = this.discountFactory
      .getStrategy(user.plan)
      .calculateDiscount(product)

    const productBuilder = new ProductBuilder(
      product.name,
      product.price,
      product.quantity,
    )
    productBuilder.setPriceWithDiscount(discount)

    return productBuilder
  }
}
