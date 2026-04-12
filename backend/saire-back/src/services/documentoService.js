const prisma = require('../lib/prisma')
const supabase = require('../lib/supabase')

// Lista todos
async function listar() {
    return prisma.documento.findMany()
}

// Listar por refrigerador
async function obterPorRefrigerador(refrigeradorId) {
    return prisma.documento.findMany({
        where: { refrigeradorId }
    })
}

// Upload documento
async function criarDocumento({ file, refrigeradorId, tipo }) {
    const fileName = `${Date.now()}-${file.filename}`

    const buffer = await file.toBuffer() // 👈 CORRETO

    const { error } = await supabase.storage
        .from('documentos')
        .upload(fileName, buffer, {
            contentType: file.mimetype
        })

    if (error) {
        throw new Error('Erro no upload: ' + error.message)
    }

    const { data } = supabase.storage
        .from('documentos')
        .getPublicUrl(fileName)

    return prisma.documento.create({
        data: {
            refrigeradorId,
            nomeArquivo: file.filename,
            url: data.publicUrl,
            tipo
        }
    })
}

module.exports = {
    listar,
    obterPorRefrigerador,
    criarDocumento
}