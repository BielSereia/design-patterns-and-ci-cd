import { ProductsLocalDatabase } from '@/database/products.local.database'
import { CreateProductDTO } from '@/dtos/create.product.dto'
import { ProductBuilder } from '@/entities/product.entity'
import { ProductExistsValidator } from '@/validators/product/product.exists.validator'
import { ProductValidator } from '@/validators/product/product.validator'

export class CreateProductService {
  private static instance: CreateProductService

  private productValidator: ProductValidator[] = []

  constructor() {
    this.productValidator.push(new ProductExistsValidator())
  }

  public static getInstance(): CreateProductService {
    if (!CreateProductService.instance) {
      CreateProductService.instance = new CreateProductService()
    }

    return CreateProductService.instance
  }

  execute(data: CreateProductDTO): ProductBuilder {
    this.productValidator.forEach((validator) => {
      validator.execute(data)
    })

    ProductsLocalDatabase.getInstance().getDatabase().push(data)

    return new ProductBuilder(data.name, data.price, data.quantity)
  }
}
