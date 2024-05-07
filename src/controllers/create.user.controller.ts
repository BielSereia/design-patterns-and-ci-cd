import { CreateUserDTO } from '@/dtos/create.user.dto'
import { CreateUserService } from '@/services/create.user.service'
import { FastifyInstance } from 'fastify'

export class CreateUserController {
  public static async execute(app: FastifyInstance): Promise<void> {
    app.post(
      '/users',
      {
        schema: {
          summary: 'Create a new user',
          tags: ['user'],
          body: {
            name: { type: 'string', default: 'john' },
            email: { type: 'string', default: 'john@email.com' },
            plan: { type: 'string', default: 'basic' },
            password: { type: 'string', default: '1234' },
          },
          response: {
            201: {
              description: 'User created',
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                plan: { type: 'string' },
              },
            },
          },
        },
      },
      async (request, reply) => {
        const { name, email, plan, password } = request.body as CreateUserDTO

        const user = CreateUserService.getInstance().execute({
          name,
          email,
          plan,
          password,
        })

        return reply.code(201).send(user)
      },
    )
  }
}
