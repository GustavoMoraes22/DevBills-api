import { z } from "zod"
import { TransationType } from "../entities/transactions.entity"

export const createTransactionSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransationType),
    date: z.coerce.date(),
    categoryId: z.string().length(24),
}

const createTransactionObject = z.object(createTransactionSchema)

export type CreateTransarionDTO = z.infer<typeof createTransactionObject>

export const indexTransactionsSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
}


const indexTransactionsObject = z.object(indexTransactionsSchema)
export type IndexTransactionsDTO = z.infer<typeof indexTransactionsObject>

export const getDashboardSchema = {
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
}


const getDashboardObject = z.object(getDashboardSchema)
export type GetDashboardDTO = z.infer<typeof getDashboardObject>