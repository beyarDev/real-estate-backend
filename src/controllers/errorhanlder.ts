import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "pg";
function sqlErrors(
  error: DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  if (error.code == "22P02") {
    res.send();
  } else if (error.code == "23503") {
    res.status(400).send({ message: error.detail });
  }
}

function notFound(req: Request, res: Response) {
  res.status(404).send({ message: "Route not found" });
}

export { sqlErrors, notFound };
