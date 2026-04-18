const service = require('../services/checklistService')

async function routes(fastify) {

  // LISTAR TODOS
  fastify.get('/checklists', {
    schema: {
      tags: ['Checklist'],
      description: 'Lista todas as checklists',
      response: {
        200: {
          type: 'array',
          items: checklistSchema()
        }
      }
    }
  }, async () => {
    return service.listar()
  })

  // BUSCAR POR ID
  fastify.get('/checklists/:id', {
    schema: {
      tags: ['Checklist'],
      description: 'Busca checklist por id',
      params: idParam(),
      response: {
        200: checklistSchema()
      }
    }
  }, async (request, reply) => {
    const id = request.params.id
    const item = await service.buscarPorId(id)

    if (!item) {
      return reply.code(404).send({ message: 'Checklist não encontrado' })
    }

    return item
  })

  // LISTAR POR COMPRESSOR
  fastify.get('/compressores/:id/checklists', {
    schema: {
      tags: ['Checklist'],
      description: 'Lista checklists por compressor',
      params: idParam(),
      response: {
        200: {
          type: 'array',
          items: checklistSchema()
        }
      }
    }
  }, async (request) => {
    return service.obterPorCompressor(request.params.id)
  })

  // CRIAR
  fastify.post('/checklists', {
    schema: {
      tags: ['Checklist'],
      description: 'Cria um checklist',
      body: checklistCreateSchema(),
      response: {
        201: checklistSchema()
      }
    }
  }, async (request, reply) => {
    const item = await service.criar(request.body)
    return reply.code(201).send(item)
  })

  // ATUALIZAR
  fastify.put('/checklists/:id', {
    schema: {
      tags: ['Checklist'],
      description: 'Atualiza um checklist',
      params: idParam(),
      body: checklistUpdateSchema(),
      response: {
        200: checklistSchema()
      }
    }
  }, async (request) => {
    return service.atualizar(request.params.id, request.body)
  })

  // DELETAR
  fastify.delete('/checklists/:id', {
    schema: {
      tags: ['Checklist'],
      description: 'Remove um checklist',
      params: idParam()
    }
  }, async (request, reply) => {
    await service.remover(request.params.id)
    return reply.code(204).send()
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

function checklistSchema() {
  return {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      compressorId: { type: 'integer' },
      montador: { type: 'string', nullable: true },
      data: { type: 'string', format: 'date-time', nullable: true },
      observacao: { type: 'string', nullable: true },
      url: { type: 'string', nullable: true },
      nomeArquivo: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' }
    }
  }
}

function checklistCreateSchema() {
  return {
    type: 'object',
    required: ['compressorId'],
    properties: {
      compressorId: { type: 'integer' },
      montador: { type: 'string' },
      data: { type: 'string', format: 'date-time' },
      observacao: { type: 'string' },
      url: { type: 'string' },
      nomeArquivo: { type: 'string' }
    }
  }
}

function checklistUpdateSchema() {
  return {
    type: 'object',
    properties: {
      montador: { type: 'string' },
      data: { type: 'string', format: 'date-time' },
      observacao: { type: 'string' },
      url: { type: 'string' },
      nomeArquivo: { type: 'string' }
    }
  }
}

module.exports = routes