const Fastify = require('fastify')
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')
const multipart = require('@fastify/multipart')

// Importando rotas
const refrigeradorRoutes = require('./routes/CompressorRoutes')
const especificacaoRoutes = require('./routes/especificacaoRoutes')
const documentoRoutes = require('./routes/documentoRoutes')
const staticRoutes = require('./routes/staticRoute')

const fastify = Fastify({ logger: true })

// CONFIG
let _port = 3000
let _host = '0.0.0.0' // Depois dá pra passar esses parametros pro env

// Swagger 
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

// Pro envio dos arquivos pra supabase
fastify.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }//,
    // attachFieldsToBody: true
})

// Pra entregar a página estática
const path = require('path')
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
  decorateReply: false
});

// Injetando as rotas
fastify.register(refrigeradorRoutes)
fastify.register(especificacaoRoutes)
fastify.register(documentoRoutes)
fastify.register(staticRoutes)

// Rota teste
fastify.get('/ok', async (request, reply) => {
    return { status: 'ok' }
})


// Start do server
const start = async () => {
    try {
        await fastify.listen({ port: _port, host: `${_host}` })
        console.log('Servidor rodando em http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()