import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";

const secret = JSON.parse(fs.readFileSync("secret.json", "utf8"));

const url = `mongodb+srv://${secret.username}:${secret.password}@cluster0.ojaqaxf.mongodb.net/`;
const database = "CS-404";
const collection = "Images";
const client = new MongoClient(url);
client.connect();

export default class ImageController {
  static async postImage(image: any) {
    const db = client.db(database);
    const col = db.collection(collection);
    const result = await col.insertOne(image);
    return result;
  }

  static async getImage(id: string) {
    const db = client.db(database);
    const col = db.collection(collection);
    const result = await col.findOne({ _id: new ObjectId(id) });
    return result;
  }

  static async getImages(page: number, limit: number) {
    const db = client.db(database);
    const col = db.collection(collection);

    const result = await col
      .find()
      .skip((page - 1) * limit) //skips the prior pages
      .limit(limit) //literally limits the amount of images per page
      .toArray();

    return result;
  }
}
