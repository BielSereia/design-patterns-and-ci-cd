export interface ProductEntity {
  name: string
  price: number
  priceWithDiscount?: number
  quantity: number
}

export class ProductBuilder {
  private name: string
  private price: number
  private priceWithDiscount?: number | undefined
  private quantity: number

  constructor(name: string, price: number, quantity: number) {
    this.name = name
    this.price = price
    this.quantity = quantity
  }

  public setPriceWithDiscount(priceWithDiscount: number): void {
    this.priceWithDiscount = priceWithDiscount
  }
}
