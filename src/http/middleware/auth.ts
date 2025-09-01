import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL) as string | undefined;
const supabaseAnon = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) as string | undefined;
const supabase = supabaseUrl && supabaseAnon
  ? createClient(supabaseUrl, supabaseAnon)
  : null;

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : undefined;
    if (!token || !supabase) {
      // eslint-disable-next-line no-console
      console.warn("Auth middleware: missing token or supabase client", {
        hasToken: Boolean(token),
        hasClient: Boolean(supabase),
        path: req.path
      });
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      // eslint-disable-next-line no-console
      console.warn("Auth middleware: token verification failed", {
        path: req.path,
        err: error?.message || null
      });
      return res.status(401).json({ error: "Unauthorized" });
    }
    (req as any).auth = { userId: data.user.id };
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Auth middleware: exception", { path: req.path });
    return res.status(401).json({ error: "Unauthorized" });
  }
}



