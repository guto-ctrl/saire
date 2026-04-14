async function routes(fastify) {
    fastify.get('/', async (request, reply) => {
        return reply.sendFile('index.html')
    })
}

module.exports = routes