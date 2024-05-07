import { CreateProductDTO } from '@/dtos/create.product.dto'
import { ProductValidator } from './product.validator'
import { ProductsLocalDatabase } from '@/database/products.local.database'

export class ProductExistsValidator implements ProductValidator {
  execute(data: CreateProductDTO): void {
    const productAlreadyExists = ProductsLocalDatabase.getInstance()
      .getDatabase()
      .find((product) => product.name === data.name)

    if (productAlreadyExists) {
      throw new Error('Product already exists')
    }
  }
}
