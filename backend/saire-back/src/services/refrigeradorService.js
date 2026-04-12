const prisma = require('../lib/prisma')

async function listar() {
  return prisma.refrigerador.findMany()
}

async function criar(data) {
  return prisma.refrigerador.create({
    data
  })
}

async function deletar(id) {
  const existe = await prisma.refrigerador.findUnique({
    where: { id }
  })

  if (!existe) {
    throw new Error('Refrigerador não encontrado')
  }

  return prisma.refrigerador.delete({
    where: { id }
  })
}

module.exports = {
  listar,
  criar
}