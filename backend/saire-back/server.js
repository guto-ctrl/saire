const Fastify = require('fastify')

const fastify = Fastify({
    logger: true
})

// CONFIG
let _port = 3000
let _host = '0.0.0.0'

// Rotas
fastify.get('/', async (request, reply) => {
    return { status: 'ok' }
})

fastify.get('/ping/:name', async (request) => { // Teste com params
  const { name } = request.params
  return { message: `pong ${name}` }
})

// Start do server
const start = async () => {
    try {
        await fastify.listen({ port: `${_port}`, host: `${_host}`})
        console.log('Servidor rodando em http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start ()