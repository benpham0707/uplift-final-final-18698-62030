import { Router } from "express";
import { requireAuth } from "./middleware/auth";
import { completeAssessment } from "@/modules/assessment/complete";
import { completePersonal } from "@/modules/personal/complete";
import * as Exp from "@/modules/experiences/controller";

const r = Router();
r.post("/assessment/complete", requireAuth, completeAssessment);
r.post("/personal/complete", requireAuth, completePersonal);

// Experiences API
r.post("/experiences", requireAuth, Exp.create);
r.get("/experiences", requireAuth, Exp.list);
r.patch("/experiences/:id", requireAuth, Exp.update);

export default r;


