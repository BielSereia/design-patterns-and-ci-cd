import { UsersLocalDatabase } from '@/database/users.local.database'
import { FastifyInstance } from 'fastify'

export class ListUsersController {
  public static async execute(app: FastifyInstance): Promise<void> {
    app.get(
      '/users',
      {
        schema: {
          summary: 'List users',
          tags: ['user'],
          response: {
            200: {
              description: 'List of users',
              type: 'array',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                plan: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      async (request, reply) => {
        const users = UsersLocalDatabase.getInstance().getDatabase()

        return reply.code(200).send(users)
      },
    )
  }
}
