import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, showStats, updateJob } from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js';
const router = Router();

// router.get("/", getAllJobs);
// router.post("/", createJob);
// router.get("/:id", getJob);
// router.delete("/:id", deleteJob);
// router.patch("/:id", updateJob);

router
.route('/')
.get(getAllJobs)
.post(checkForTestUser,validateJobInput, createJob);

router
.route('/stats')
.get(showStats);

router
  .route('/:id')
  .get(validateIdParam,getJob)
  .patch(checkForTestUser, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParam,deleteJob);

export default router;