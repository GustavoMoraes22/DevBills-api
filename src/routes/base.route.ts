//guardar todas as rotas 

import { Router } from "express"

import packgeJson from "../../package.json"

export const baseRoutes = Router()

baseRoutes.get("/", (_, res) => {
    const { name, version } = packgeJson

    res.status(201).json({ name, version })
})