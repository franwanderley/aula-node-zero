import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {

  async create({ title, description, duration }) {
    const videoId = randomUUID()
    await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration})`
  }

  async find(search = '') {
    return await sql`select * from videos where title ilike ${'%'+ search +'%'} or ${search} is null`
  }

  async findById(id) {
    return await sql`select * from videos where id = ${id}`
  }
}