import { Request, Response, NextFunction } from "express";

export function catchAsyncErrors(callback: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await callback(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}