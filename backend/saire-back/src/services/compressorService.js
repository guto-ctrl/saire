const prisma = require('../lib/prisma')

async function listar() {
    return prisma.compressor.findMany()
}

async function buscarPorId(id) {
    return prisma.compressor.findUnique({
        where: { id }
    })
}

async function criar(data) {
    return prisma.compressor.create({
        data
    })
}

async function atualizar(id, data) {
    return prisma.compressor.update({
        where: { id },
        data
    })
}

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