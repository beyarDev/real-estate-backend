import { Request, Response, NextFunction } from "express";

function sqlErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  if (error.code == "22P02") {
    res.send();
  } else if (error.code == "23503") {
    res.status(400).send({ message: error.detail });
  } else if (error.status) {
    res.status(error.status).send(error.message);
  }
}

function notFound(req: Request, res: Response) {
  res.status(404).send({ message: "Route not found" });
}

export { sqlErrors, notFound };
