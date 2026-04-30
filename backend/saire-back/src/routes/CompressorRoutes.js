const service = require('../services/compressorService')

async function routes(fastify) {

  // LISTAR
  fastify.get('/compressores', {
    schema: {
      tags: ['Compressor'],
      description: 'Lista todos os compressores',
      response: {
        200: {
          type: 'array',
          items: compressorSchema()
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
      params: idParam(),
      response: {
        200: compressorSchema()
      }
    }
  }, async (request, reply) => {
    const item = await service.buscarPorId(request.params.id)

    if (!item) {
      return reply.code(404).send({ message: 'Não encontrado' })
    }

    return item
  })

  // CRIAR
  fastify.post('/compressores', {
    schema: {
      tags: ['Compressor'],
      description: 'Cria compressor',
      body: compressorCreateSchema(),
      response: {
        201: compressorSchema()
      }
    }
  }, async (request, reply) => {
    const item = await service.criar(request.body)
    return reply.code(201).send(item)
  })

  // ATUALIZAR
  fastify.put('/compressores/:id', {
    schema: {
      tags: ['Compressor'],
      description: 'Atualiza compressor',
      params: idParam(),
      body: compressorUpdateSchema(),
      response: {
        200: compressorSchema()
      }
    }
  }, async (request, reply) => {
    try {
      return await service.atualizar(request.params.id, request.body)
    } catch {
      return reply.code(404).send({ message: 'Não encontrado' })
    }
  })

  // DELETAR
  fastify.delete('/compressores/:id', {
    schema: {
      tags: ['Compressor'],
      description: 'Remove compressor',
      params: idParam()
    }
  }, async (request, reply) => {
    try {
      await service.deletar(request.params.id)
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Não encontrado' })
    }
  })
}
function idParam() {
  return {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' }
    }
  }
}

function compressorSchema() {
  return {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      modelo: { type: 'string' },
      marca: { type: 'string' },

      voltagem: { type: 'string', nullable: true }, // 👈 cuidado aqui
      frequencia: { type: 'integer', nullable: true },
      corrente: { type: 'number', nullable: true },

      correnteBloqueadoY: { type: 'number', nullable: true },
      correnteBloqueadoYY: { type: 'number', nullable: true },
      volumeDeslocamento: { type: 'number', nullable: true },
      rotacao: { type: 'integer', nullable: true },

      createdAt: { type: 'string', format: 'date-time' }
    }
  }
}

function compressorCreateSchema() {
  return {
    type: 'object',
    required: ['modelo', 'marca'],
    properties: {
      modelo: { type: 'string' },
      marca: { type: 'string' },

      voltagem: { type: 'string' },
      frequencia: { type: 'integer' },
      corrente: { type: 'number' },

      correnteBloqueadoY: { type: 'number' },
      correnteBloqueadoYY: { type: 'number' },
      volumeDeslocamento: { type: 'number' },
      rotacao: { type: 'integer' }
    }
  }
}

function compressorUpdateSchema() {
  return {
    type: 'object',
    properties: {
      modelo: { type: 'string' },
      marca: { type: 'string' },
      voltagem: { type: 'integer' },
      frequencia: { type: 'integer' },
      corrente: { type: 'number' }
    }
  }
}

module.exports = routes