const service = require('../services/documentoService')

async function routes(fastify) {

  // LISTAR TODOS
  fastify.get('/documentos', {
    schema: {
      tags: ['Documento'],
      description: 'Lista todos os documentos',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              refrigeradorId: { type: 'number' },
              nomeArquivo: { type: 'string' },
              url: { type: 'string' },
              tipo: { type: 'string' },
              createdAt: { type: 'string' }
            }
          }
        }
      }
    }
  }, async () => {
    return service.listar()
  })

  // LISTAR POR REFRIGERADOR
  fastify.get('/refrigeradores/:id/documentos', {
    schema: {
      tags: ['Documento'],
      description: 'Lista documentos por refrigerador',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nomeArquivo: { type: 'string' },
              url: { type: 'string' },
              tipo: { type: 'string' }
            }
          }
        }
      }
    }
  }, async (request) => {
    const refrigeradorId = Number(request.params.id)
    return service.obterPorRefrigerador(refrigeradorId)
  })

  // UPLOAD DOCUMENTO
  fastify.post('/refrigeradores/:id/documentos', {
    schema: {
      tags: ['Documento'],
      description: 'Upload de documento',
      consumes: ['multipart/form-data'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      }
    }
  }, async (request) => {
    const refrigeradorId = Number(request.params.id)

    const file = await request.file()

    return service.criarDocumento({
      file,
      refrigeradorId,
      tipo: 'manual'
    })
  })
}

module.exports = routes