import axiosClient from "./axiosClient";
import type { Expense, ExpenseRequest } from "../types/expense";

export interface ExpenseFilters {
    period?: "week" | "month" | "3months" | "custom";
    startDate?: string;
    endDate?: string;
}

export const expensesApi = {
    getAll: (filters?: ExpenseFilters) =>
        axiosClient.get<Expense[]>("/expenses", { params: filters }),
    create: (data: ExpenseRequest) =>
        axiosClient.post<Expense>("/expenses", data),
    update: (id: number, data: ExpenseRequest) =>
        axiosClient.put<Expense>(`/expenses/${id}`, data),
    delete: (id: number) => axiosClient.delete(`/expenses/${id}`),
};
