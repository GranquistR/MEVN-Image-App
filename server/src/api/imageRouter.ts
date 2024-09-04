import Express from "express";
import Upload from "../../../client/src/entities/Upload.js";
import ImageController from "./controllers/imageController.js";

// Make an express router
const dataRouter = new Express.Router();
dataRouter.use(Express.json());

dataRouter.get("/image", async (req, res) => {
  let page = 1;
  let limit = 9;

  if (req.query.page) {
    page = parseInt(req.query.page.toString());
  }
  if (page < 1) {
    page = 1;
  }

  if (req.query.limit) {
    limit = parseInt(req.query.limit.toString());
  }
  if (limit < 1) {
    limit = 1;
  }

  ImageController.getImages(page, limit)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("Internal server error");
    });
});

dataRouter.post("/image", async (req, res) => {
  const upload = req.body as Upload;

  //if any upload is missing a title, description, or image, return a 400 status code
  if (
    !upload.title ||
    !upload.description ||
    !upload.image ||
    !upload.tags ||
    upload.title === "" ||
    upload.description === "" ||
    upload.image === ""
  ) {
    res
      .status(400)
      .json("Upload must include a title, description, tags, and image");
    return;
  }

  ImageController.postImage(upload)
    .then((result) => {
      console.log(result);
      if (result.insertedId) {
        res.status(200).json({ success: true, id: result.insertedId });
      } else {
        res.status(500).json("Internal server error");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("Internal server error");
    });
});

export default dataRouter;
