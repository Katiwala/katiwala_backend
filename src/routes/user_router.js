import express from "express";
import {
  user_add,
  user_get,
  user_update,
  user_delete,
} from "../controller/user_controller.js";

const router = express.Router();

router.post("/", user_add);
router.get("/", user_get);
router.put("/:id", user_update);
router.delete("/:id", user_delete);

export default router;
