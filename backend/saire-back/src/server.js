const Fastify = require('fastify')
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')
const multipart = require('@fastify/multipart')


// Importando rotas
const refrigeradorRoutes = require('./routes/refrigeradorRoutes')
const especificacaoRoutes = require('./routes/especificacaoRoutes')
const documentoRoutes = require('./routes/documentoRoutes')

const fastify = Fastify({ logger: true })

// CONFIG
let _port = 3000
let _host = '0.0.0.0'
fastify.register(swagger, {
    openapi: {
        info: {
            title: "API saire",
            description: 'Documentação da API',
            version: '1.0.0'
        }
    }
})
fastify.register(swaggerUI, {
    routePrefix: '/swagger'
})
fastify.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }//,
    // attachFieldsToBody: true
})

// Injetando as rotas
fastify.register(refrigeradorRoutes)
fastify.register(especificacaoRoutes)
fastify.register(documentoRoutes)

// Rota
fastify.get('/', async (request, reply) => {
    return { status: 'ok' }
})


// Start do server
const start = async () => {
    try {
        await fastify.listen({ port: `${_port}`, host: `${_host}` })
        console.log('Servidor rodando em http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()