import { CalculateDiscountDTO } from '@/dtos/calculate.discount.dto'
import { CalculateDiscountService } from '@/services/calculate.discount.service'
import { FastifyInstance } from 'fastify'

export class CalculateDiscountController {
  public static async execute(app: FastifyInstance): Promise<void> {
    app.post(
      '/discount',
      {
        schema: {
          summary: 'Calculate discount for a product based on user email',
          tags: ['discount'],
          body: {
            email: { type: 'string', default: 'john@email.com' },
            product: { type: 'string', default: 'Product 1' },
          },
          response: {
            200: {
              description: 'Discount calculated',
              type: 'object',
              properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                priceWithDiscount: { type: 'number' },
                quantity: { type: 'number' },
              },
            },
          },
        },
      },
      async (request, reply) => {
        const { email, product } = request.body as CalculateDiscountDTO

        const productDiscounted =
          CalculateDiscountService.getInstance().execute({
            email,
            product,
          })

        return reply.code(200).send(productDiscounted)
      },
    )
  }
}
