const prisma = require('../lib/prisma')

// LISTAR TODOS
async function listar() {
  return prisma.checklist.findMany({
    include: {
      compressor: true,
      etiquetas: true
    }
  })
}

// BUSCAR POR ID
async function buscarPorId(id) {
  return prisma.checklist.findUnique({
    where: { id },
    include: {
      compressor: true,
      etiquetas: true
    }
  })
}

// LISTAR POR COMPRESSOR
async function obterPorCompressor(compressorId) {
  return prisma.checklist.findMany({
    where: { compressorId },
    include: {
      etiquetas: true
    }
  })
}

// CRIAR
async function criar(data) {
  return prisma.checklist.create({
    data
  })
}

// ATUALIZAR
async function atualizar(id, data) {
  return prisma.checklist.update({
    where: { id },
    data
  })
}

// DELETAR
async function remover(id) {
  return prisma.checklist.delete({
    where: { id }
  })
}

module.exports = {
  listar,
  buscarPorId,
  obterPorCompressor,
  criar,
  atualizar,
  remover
}