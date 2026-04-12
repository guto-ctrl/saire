const service = require('../services/especificacaoService')

async function routes(fastify) {

    // Listar todos
    fastify.get('/espec', {
        schema: {
            tags: ['Especificacoes'],
            description: 'Lista todas as especificações cadastradas',
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            modelo: { type: 'string' }
                        }
                    }
                }
            }
        }
    }, async () => {
        return service.listar()
    })

    // BUSCAR
    fastify.get('/refrigeradores/:id/especificacoes', {
        schema: {
            tags: ['Especificacoes'],
            description: 'Busca especificações por refrigerador',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                }
            }
        }
    }, async (request, reply) => {
        const refrigeradorId = Number(request.params.id)

        const data = await service.obterPorRefrigerador(refrigeradorId)

        if (!data) {
            return reply.code(404).send({ message: 'Não encontrado' })
        }

        return data
    })

    // CRIAR
    fastify.post('/refrigeradores/:id/especificacoes', {
        schema: {
            tags: ['Especificacoes'],
            description: 'Cria especificações',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                }
            },
            body: {
                type: 'object',
                properties: {
                    voltagem: { type: 'number' },
                    frequencia: { type: 'number' },
                    corrente: { type: 'number' },
                    correnteBloqueadoY: { type: 'number' },
                    correnteBloqueadoYY: { type: 'number' },
                    volumeDeslocamento: { type: 'number' },
                    rotacao: { type: 'number' }
                }
            }
        }
    }, async (request) => {
        const refrigeradorId = Number(request.params.id)

        return service.criar({
            ...request.body,
            refrigeradorId
        })
    })

    // ATUALIZAR
    fastify.put('/refrigeradores/:id/especificacoes', {
        schema: {
            tags: ['Especificacoes'],
            description: 'Atualiza especificações',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                }
            },
            body: {
                type: 'object',
                properties: {
                    voltagem: { type: 'number' },
                    frequencia: { type: 'number' },
                    corrente: { type: 'number' }
                }
            }
        }
    }, async (request, reply) => {
        const refrigeradorId = Number(request.params.id)

        try {
            return await service.atualizar(refrigeradorId, request.body)
        } catch {
            return reply.code(404).send({ message: 'Não encontrado' })
        }
    })

    // DELETE
    fastify.delete('/refrigeradores/:id/especificacoes', {
        schema: {
            tags: ['Especificacoes'],
            description: 'Remove especificações',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                }
            }
        }
    }, async (request, reply) => {
        const refrigeradorId = Number(request.params.id)

        try {
            await service.deletar(refrigeradorId)
            return { ok: true }
        } catch {
            return reply.code(404).send({ message: 'Não encontrado' })
        }
    })
}

module.exports = routes