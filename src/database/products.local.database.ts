import { ProductEntity } from '@/entities/product.entity'

export class ProductsLocalDatabase {
  private static instance: ProductsLocalDatabase
  private products: ProductEntity[]

  constructor() {
    this.products = []
  }

  public static getInstance(): ProductsLocalDatabase {
    if (!ProductsLocalDatabase.instance) {
      ProductsLocalDatabase.instance = new ProductsLocalDatabase()
    }

    return ProductsLocalDatabase.instance
  }

  public getDatabase(): ProductEntity[] {
    return this.products
  }
}
