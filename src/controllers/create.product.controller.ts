import { CreateProductDTO } from '@/dtos/create.product.dto'
import { CreateProductService } from '@/services/create.product.service'
import { FastifyInstance } from 'fastify'

export class CreateProductController {
  public static async execute(app: FastifyInstance): Promise<void> {
    app.post(
      '/products',
      {
        schema: {
          summary: 'Create a new product',
          tags: ['product'],
          body: {
            name: { type: 'string', default: 'Product 1' },
            price: { type: 'number', default: 300 },
            quantity: { type: 'number', default: 10 },
          },
          response: {
            201: {
              description: 'Product created',
              type: 'object',
              properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                quantity: { type: 'number' },
              },
            },
          },
        },
      },
      async (request, reply) => {
        const { name, price, quantity } = request.body as CreateProductDTO

        const product = CreateProductService.getInstance().execute({
          name,
          price,
          quantity,
        })

        return reply.code(201).send(product)
      },
    )
  }
}
