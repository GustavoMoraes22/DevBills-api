import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.servic";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";


//controla a req de uma nova categoria
export class CategoriesController {
    async create(_: Request, res: Response) {
        const repository = new CategoriesRepository(CategoryModel);
        const service = new CategoriesService(repository);

        const result = await service.create()

        return res.status(201).json(result)
    }
}