import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  create(video) {
    const videoId = randomUUID()
    this.#videos.set(videoId,video);
  }

  find(search) {
    return Array.from(this.#videos.entries())
    ?.map(video => ({id: video?.[0], ...video?.[1]}))
    ?.filter(video => search ? video?.title?.includes(search) : true)
  }

  findById(id) {
    return this.#videos.get(id)
  }
}