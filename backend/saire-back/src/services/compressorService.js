const prisma = require('../lib/prisma')

// LISTAR
async function listar() {
  return prisma.compressor.findMany({
    include: {
      checklists: {
        include: {
          etiquetas: true
        }
      }
    }
  })
}

// BUSCAR POR ID
async function buscarPorId(id) {
  return prisma.compressor.findUnique({
    where: { id },
    include: {
      checklists: true,
      etiquetas: true
    }
  })
}

// CRIAR
async function criar(data) {
  return prisma.compressor.create({
    data
  })
}

// ATUALIZAR
async function atualizar(id, data) {
  return prisma.compressor.update({
    where: { id },
    data
  })
}

// DELETAR
async function deletar(id) {
  return prisma.compressor.delete({
    where: { id }
  })
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
}