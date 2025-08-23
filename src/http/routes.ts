import { Router } from "express";
import { requireAuth } from "./middleware/auth";
import { completeAssessment } from "@/modules/assessment/complete";
import { completePersonal } from "@/modules/personal/complete";

const r = Router();
r.post("/assessment/complete", requireAuth, completeAssessment);
r.post("/personal/complete", requireAuth, completePersonal);

export default r;


