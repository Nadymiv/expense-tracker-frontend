import { type Expense } from "../types/expense";
import { ExpenseItem } from "./ExpenseItem";

interface Props {
    expenses: Expense[];
    onDelete: (id: number) => void;
    onEdit: (expense: Expense) => void; // НОВИЙ ПРОПС
}

export const ExpenseList = ({ expenses, onDelete, onEdit }: Props) => {
    if (expenses.length === 0) return <p>Витрат поки немає.</p>;

    return (
        <ul className="expense-list">
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
};
