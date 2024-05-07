import fastify, { FastifyInstance } from 'fastify'
import { CreateUserController } from '@/controllers/create.user.controller'
import { CreateProductController } from '@/controllers/create.product.controller'
import { CalculateDiscountController } from '@/controllers/calculate.discount.controller'
import { ListUsersController } from './controllers/list.users.controller'
import { ListProductsController } from './controllers/list.products.controller'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export class App {
  private fastify: FastifyInstance
  private static instance: App

  constructor() {
    this.fastify = fastify()

    this.fastify.register(fastifyCors, {
      origin: '*',
    })

    this.fastify.register(fastifySwagger, {
      swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
          title: 'pass.in',
          description:
            'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
          version: '1.0.0',
        },
      },
    })

    this.fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    })

    this.fastify.register(CreateUserController.execute)
    this.fastify.register(CreateProductController.execute)
    this.fastify.register(CalculateDiscountController.execute)
    this.fastify.register(ListUsersController.execute)
    this.fastify.register(ListProductsController.execute)
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App()
    }

    return App.instance
  }

  getFastifyInstance(): FastifyInstance {
    return this.fastify
  }
}
