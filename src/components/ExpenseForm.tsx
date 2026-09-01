import { useState } from "react";
import {
    type Expense,
    type ExpenseRequest,
    type Category,
} from "../types/expense";

interface Props {
    onSubmit: (expense: ExpenseRequest) => void;
    initialData?: Expense; // Якщо передано – режим редагування
    onCancel?: () => void; // Додатковий колбек для скасування (закриття форми)
}

const CATEGORIES: Category[] = [
    "GROCERIES",
    "LEISURE",
    "ELECTRONICS",
    "UTILITIES",
    "CLOTHING",
    "HEALTH",
    "OTHERS",
];

const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const ExpenseForm = ({ onSubmit, initialData, onCancel }: Props) => {
    // Ініціалізація станів
    const [title, setTitle] = useState(initialData?.title ?? "");
    const [amount, setAmount] = useState(initialData?.amount?.toString() ?? "");
    const [category, setCategory] = useState<Category>(
        initialData?.category ?? CATEGORIES[0],
    );
    const [expenseDate, setExpenseDate] = useState(
        initialData?.expenseDate ?? getTodayDate(),
    );

    const isEditing = !!initialData;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount) return;

        const expenseData: ExpenseRequest = {
            title,
            amount: Number(amount),
            category,
            expenseDate,
        };

        onSubmit(expenseData);

        // Якщо це створення – скидаємо форму
        // Якщо редагування – залишаємо дані (батьківський компонент вирішить, що робити далі)
        if (!isEditing) {
            setTitle("");
            setAmount("");
            setCategory(CATEGORIES[0]);
            setExpenseDate(getTodayDate());
        }
    };

    // Функція скидання до початкових даних (для скасування редагування)
    const handleCancel = () => {
        if (initialData) {
            setTitle(initialData.title);
            setAmount(initialData.amount.toString());
            setCategory(initialData.category);
            setExpenseDate(initialData.expenseDate);
        }
        if (onCancel) onCancel();
    };

    return (
        <form className="entry-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Назва витрати"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Сума"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                required
            >
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                required
            />

            <button type="submit" className="submit-button">
                {isEditing ? "Зберегти зміни" : "Додати"}
            </button>

            {isEditing && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="icon-button"
                >
                    Скасувати
                </button>
            )}
        </form>
    );
};
