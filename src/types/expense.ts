export type Category =
    | "GROCERIES"
    | "LEISURE"
    | "ELECTRONICS"
    | "UTILITIES"
    | "CLOTHING"
    | "HEALTH"
    | "OTHERS";

export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: Category;
    expenseDate: string; // перейменовано з "date", і тепер обов'язкове
    createdAt: string;
}

export interface ExpenseRequest {
    title: string;
    amount: number;
    category: Category; // обов'язкове, точний union-тип
    expenseDate: string; // ДОДАНО — раніше було відсутнє
}
