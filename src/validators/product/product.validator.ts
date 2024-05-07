import { CreateProductDTO } from '@/dtos/create.product.dto'

export interface ProductValidator {
  execute(data: CreateProductDTO): void
}
