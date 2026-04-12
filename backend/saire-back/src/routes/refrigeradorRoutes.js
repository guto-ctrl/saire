const service = require('../services/refrigeradorService')

async function routes(fastify) {
    fastify.get('/refrigeradores', async () => {
        return service.listar()
    })
    fastify.post('/refrigeradores', {
        schema: {
            description: 'Cria um refrigerador',
            tags: ['Refrigerador'],
            body: {
            type: 'object',
            required: ['modelo'],
            properties: {
                modelo: { type: 'string' }
            }
            },
            response: {
            200: {
                type: 'object',
                properties: {
                id: { type: 'number' },
                modelo: { type: 'string' },
                numeroSerie: { type: 'string' }
                }
            }
            }
        }
        }, async (request) => {
        return service.criar(request.body)
    })
}

module.exports = routes