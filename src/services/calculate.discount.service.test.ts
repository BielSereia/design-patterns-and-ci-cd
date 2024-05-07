import { Plans } from '@/plans/plans'
import { beforeAll, describe, expect, it } from 'vitest'
import { CreateUserService } from './create.user.service'
import { CreateProductService } from './create.product.service'
import { CalculateDiscountService } from './calculate.discount.service'
import { ProductBuilder } from '@/entities/product.entity'

beforeAll(() => {
  const usersData = [
    {
      name: 'Doe 1',
      email: 'doe1@email.com',
      plan: Plans.FREE,
      password: '1234',
    },
    {
      name: 'Doe 2',
      email: 'doe2@email.com',
      plan: Plans.BASIC,
      password: '1234',
    },
    {
      name: 'Doe 3',
      email: 'doe3@email.com',
      plan: Plans.PRO,
      password: '1234',
    },
  ]

  usersData.forEach((user) => {
    CreateUserService.getInstance().execute(user)
  })

  const productsData = [
    {
      name: 'Product 1',
      price: 300,
      quantity: 10,
    },
  ]

  productsData.forEach((product) => {
    CreateProductService.getInstance().execute(product)
  })
})

describe('Calculate Discount Service', () => {
  it('should be able to calculate discount for free plan', () => {
    const data = {
      email: 'doe1@email.com',
      product: 'Product 1',
    }

    const product = CalculateDiscountService.getInstance().execute(data)

    expect(product).instanceOf(ProductBuilder)
    expect(product).ownProperty('priceWithDiscount', 300)
  })

  it('should be able to calculate discount for basic plan', () => {
    const data = {
      email: 'doe2@email.com',
      product: 'Product 1',
    }

    const product = CalculateDiscountService.getInstance().execute(data)

    expect(product).instanceOf(ProductBuilder)
    expect(product).ownProperty('priceWithDiscount', 255)
  })

  it('should be able to calculate discount for pro plan', () => {
    const data = {
      email: 'doe3@email.com',
      product: 'Product 1',
    }

    const product = CalculateDiscountService.getInstance().execute(data)

    expect(product).instanceOf(ProductBuilder)
    expect(product).ownProperty('priceWithDiscount', 210)
  })

  it('should not be able to calculate discount cause user not found', () => {
    const data = {
      email: 'doe4@email.com',
      product: 'Product 1',
    }

    expect(() =>
      CalculateDiscountService.getInstance().execute(data),
    ).toThrowError('User not found')
  })

  it('should not be able to calculate discount cause product not found', () => {
    const data = {
      email: 'doe1@email.com',
      product: 'Product 2',
    }

    expect(() =>
      CalculateDiscountService.getInstance().execute(data),
    ).toThrowError('Product not found')
  })
})
