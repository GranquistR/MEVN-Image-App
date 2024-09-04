export default class Upload {
  id: string
  title: string
  description: string
  image: string
  tags: string[] = []

  constructor(id: string, title: string, description: string, image: string) {
    this.id = id
    this.title = title
    this.description = description
    this.image = image
  }
}
