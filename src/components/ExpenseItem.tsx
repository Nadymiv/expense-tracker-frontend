import { type Expense } from "../types/expense";

interface Props {
    expense: Expense;
    onDelete: (id: number) => void;
    onEdit: (expense: Expense) => void; // НОВЕ
}

export const ExpenseItem = ({ expense, onDelete, onEdit }: Props) => {
    return (
        <li className="expense-row">
            <div className="expense-main">
                <span className="expense-title">{expense.title}</span>
                <span className="expense-date">{expense.expenseDate}</span>
                <span className="expense-category">{expense.category}</span>
            </div>
            <span className="expense-amount">{expense.amount.toFixed(2)}₴</span>
            <div className="expense-actions">
                <button className="icon-button" onClick={() => onEdit(expense)}>
                    Редагувати
                </button>
                <button
                    className="icon-button danger"
                    onClick={() => onDelete(expense.id)}
                >
                    Видалити
                </button>
            </div>
        </li>
    );
};
