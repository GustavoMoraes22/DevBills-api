import { StatusCodes } from "http-status-codes";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionsRepository } from "../database/repositories/transactions.repository";

import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app.error";
import { CreateTransarionDTO, GetDashboardDTO, GetFinancialEvolutionDTO } from "../dtos/transactions.dto";
import { IndexTransactionsDTO } from "../dtos/transactions.dto";
import { Balance } from "../entities/balance.entity";
import { Expense } from "../entities/expense.entity";

export class TransactionsService {
    constructor(private trasactionsRepository: TransactionsRepository, private categoriesRepository: CategoriesRepository) { }

    async create({ title, type, date, categoryId, amount }: CreateTransarionDTO): Promise<Transaction> {
        const category = await this.categoriesRepository.findById(categoryId);

        if (!category) {
            throw new AppError("Category does not exists.", StatusCodes.NOT_FOUND);
        }

        const transaction = new Transaction({
            title, type, date, category, amount,
        });

        const createdTransaction = await this.trasactionsRepository.create(transaction);

        return createdTransaction;
    }

    async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
        const transactions = await this.trasactionsRepository.index(filters)

        return transactions;

    }

    async getDashboard({ beginDate, endDate }: GetDashboardDTO): Promise<{
        balance: Balance, expenses: Expense[]
    }> {

        let [balance, expenses] = await Promise.all([
            this.trasactionsRepository.getBalance({ beginDate, endDate }),
            this.trasactionsRepository.GetExpense({
                beginDate,
                endDate,
            })
        ])

        if (!balance) {
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0
            })
        }

        return { balance, expenses };
    }

    async getFinancialEvolution({
        year,
    }: GetFinancialEvolutionDTO): Promise<Balance[]> {
        const financialEvolution = await this.trasactionsRepository.getFinancialEvolution({ year })

        return financialEvolution
    }

}