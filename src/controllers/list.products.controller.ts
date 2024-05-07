import { ProductsLocalDatabase } from '@/database/products.local.database'
import { FastifyInstance } from 'fastify'

export class ListProductsController {
  public static async execute(app: FastifyInstance): Promise<void> {
    app.get(
      '/products',
      {
        schema: {
          summary: 'List products',
          tags: ['product'],
          response: {
            200: {
              description: 'List of products',
              type: 'array',
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
        const users = ProductsLocalDatabase.getInstance().getDatabase()

        return reply.code(200).send(users)
      },
    )
  }
}
