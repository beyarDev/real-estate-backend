"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.sqlErrors = void 0;
function sqlErrors(error, req, res, next) {
    console.log(error);
    if (error.code == "22P02") {
        res.send();
    }
    else if (error.code == "23503") {
        res.status(400).send({ message: error.detail });
    }
    else if (error.status) {
        res.status(error.status).send(error.message);
    }
}
exports.sqlErrors = sqlErrors;
function notFound(req, res) {
    res.status(404).send({ message: "Route not found" });
}
exports.notFound = notFound;
