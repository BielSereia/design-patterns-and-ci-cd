import { beforeAll, describe, expect, it } from 'vitest'
import { ListProductsService } from './list.products.service'
import { CreateProductService } from './create.product.service'

beforeAll(() => {
  const data = [
    {
      name: 'Product 1',
      price: 300,
      quantity: 10,
    },
    {
      name: 'Product 2',
      price: 300,
      quantity: 10,
    },
    {
      name: 'Product 3',
      price: 300,
      quantity: 10,
    },
  ]

  data.forEach((product) => {
    CreateProductService.getInstance().execute(product)
  })
})

describe('List Products Service', () => {
  it('should be able to list all products', () => {
    const products = ListProductsService.getInstance().execute()

    expect(products).lengthOf(3)
    expect(products[0].name).toBe('Product 1')
    expect(products[1].name).toBe('Product 2')
    expect(products[2].name).toBe('Product 3')
  })
})
