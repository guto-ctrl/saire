const prisma = require('../lib/prisma')

async function listar() {
    return prisma.especificacoes.findMany()
}

async function obterPorRefrigerador(refrigeradorId) {
    return prisma.especificacoes.findUnique({
        where: { refrigeradorId }
    })
}

async function criar(data) {
    return prisma.especificacoes.create({
        data
    })
}

async function atualizar(refrigeradorId, data) {
    return prisma.especificacoes.update({
        where: { refrigeradorId },
        data
    })
}

async function deletar(refrigeradorId) {
    return prisma.especificacoes.delete({
        where: { refrigeradorId }
    })
}

module.exports = {
    listar,
    obterPorRefrigerador,
    criar,
    atualizar,
    deletar
}