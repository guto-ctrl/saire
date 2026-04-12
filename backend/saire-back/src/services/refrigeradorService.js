const prisma = require('../lib/prisma')

async function listar() {
    return prisma.refrigerador.findMany()
}

async function buscarPorId(id) {
    return prisma.refrigerador.findUnique({
        where: { id }
    })
}

async function criar(data) {
    return prisma.refrigerador.create({
        data
    })
}

async function atualizar(id, data) {
    return prisma.refrigerador.update({
        where: { id },
        data
    })
}

async function deletar(id) {
    return prisma.refrigerador.delete({
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