const service = require('../services/compressorService')

async function routes(fastify) {

  // LISTAR
  fastify.get('/compressores', {
    schema: {
      tags: ['Compressor'],
      description: 'Lista todos',
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

  // BUSCAR POR ID
  fastify.get('/compressores/:id', {
    schema: {
      tags: ['Compressor'],
      description: 'Busca por ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      }
    }
  }, async (request, reply) => {
    const id = Number(request.params.id)

    const item = await service.buscarPorId(id)

    if (!item) {
      return reply.code(404).send({ message: 'Não encontrado' })
    }

    return item
  })

  // CRIAR
  fastify.post('/compressores', {
    schema: {
      tags: ['Compressor'],
      description: 'Cria',
      body: {
        type: 'object',
        required: ['modelo'],
        properties: {
          modelo: { type: 'string' }
        }
      }
    }
  }, async (request) => {
    return service.criar(request.body)
  })

  // ATUALIZAR
  fastify.put('/compressores/:id', {
    schema: {
      tags: ['Compressor'],
      description: 'Atualiza',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        type: 'object',
        properties: {
          modelo: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const id = Number(request.params.id)

    try {
      return await service.atualizar(id, request.body)
    } catch {
      return reply.code(404).send({ message: 'Não encontrado' })
    }
  })

  // DELETAR
  fastify.delete('/compressores/:id', {
    schema: {
      tags: ['Compressor'],
      description: 'Deleta',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      }
    }
  }, async (request, reply) => {
    const id = Number(request.params.id)

    try {
      await service.deletar(id)
      return { ok: true }
    } catch {
      return reply.code(404).send({ message: 'Não encontrado' })
    }
  })
}

module.exports = routes