import { ProductsLocalDatabase } from '@/database/products.local.database'
import { ProductEntity } from '@/entities/product.entity'

export class ListProductsService {
  private static instance: ListProductsService

  public static getInstance(): ListProductsService {
    if (!ListProductsService.instance) {
      ListProductsService.instance = new ListProductsService()
    }

    return ListProductsService.instance
  }

  execute(): ProductEntity[] {
    return ProductsLocalDatabase.getInstance().getDatabase()
  }
}
