import { App } from '@/app'

const app = new App()

app
  .getFastifyInstance()
  .listen({ host: '0.0.0.0', port: 3333 })
  .then(() => {
    console.log('Server running on 3333')
  })
