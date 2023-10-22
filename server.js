/* Create server no framework
  import { createServer } from 'node:http'

  const server = createServer((request, response) => {
    console.log('oi')
    response.write("oi tudo bem")
  })

  server.listen(3333)
*/

 //Usando fastify
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify()

const database = new DatabasePostgres()

server.get('/', () => {
  return 'Hello World'
});

server.post('/videos', async(request, reply) => {
  const body = request.body;
  await database.create(body)

  return reply.status(201).send()
})


server.get('/videos', async (request, reply) => {
  const { search } = request.query;
  return await database.find(search)
})

server.get('/videos/:id', (request, reply) => {
  return database.findById(request.params?.id)
})

server.listen({
  port: 3333,
})