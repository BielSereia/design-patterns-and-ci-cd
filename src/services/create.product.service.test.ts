import { describe, expect, it } from 'vitest'
import { CreateProductService } from './create.product.service'
import { ProductBuilder } from '@/entities/product.entity'

describe('Create Product Service', () => {
  it('should be able to create a new product', () => {
    const data = {
      name: 'Product 1',
      price: 300,
      quantity: 10,
    }

    const product = CreateProductService.getInstance().execute(data)

    expect(product).instanceOf(ProductBuilder)
  })

  it('should not be able to create a new product cause already have one with same name', () => {
    const data = {
      name: 'Product 1',
      price: 300,
      quantity: 10,
    }

    expect(() => CreateProductService.getInstance().execute(data)).toThrowError(
      'Product already exists',
    )
  })
})
