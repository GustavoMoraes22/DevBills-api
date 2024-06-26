import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/categories.servic";
import { CreateCategoryDTO } from "../dtos/categories.dto";
import { StatusCodes } from "http-status-codes";
import { BodyRequest } from "./types";


//controla a req de uma nova categoria
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    create = async (req: BodyRequest<CreateCategoryDTO>,
        res: Response, next: NextFunction) => {

        try {

            const { title, color } = req.body

            const result = await this.categoriesService.create({ title, color })

            return res.status(StatusCodes.CREATED).json(result)
        } catch (error) {
            next(error)
        }

    }

    index = async (_: Request,
        res: Response, next: NextFunction) => {

        try {

            const result = await this.categoriesService.index()

            return res.status(StatusCodes.OK).json(result)
        } catch (error) {
            next(error)
        }

    }
}