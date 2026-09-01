import { useEffect, useState } from "react";
import { expensesApi } from "../api/expensesApi";
import { type Expense, type ExpenseRequest } from "../types/expense";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { useAuth } from "../auth/useAuth";

type PeriodOption = "" | "week" | "month" | "3months" | "custom";

export const DashboardPage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const { logout } = useAuth();

    const [period, setPeriod] = useState<PeriodOption>("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchExpenses = async () => {
        try {
            const filters =
                period === ""
                    ? undefined
                    : period === "custom"
                      ? { period, startDate, endDate }
                      : { period };

            const res = await expensesApi.getAll(filters);
            setExpenses(res.data);
        } catch (err) {
            console.error("Помилка завантаження", err);
        }
    };

    useEffect(() => {
        // для "custom" чекаємо, поки юзер реально введе обидві дати,
        // інакше зайві запити з порожніми startDate/endDate
        if (period === "custom" && (!startDate || !endDate)) return;
        fetchExpenses();
    }, [period, startDate, endDate]);

    const handleSubmit = async (data: ExpenseRequest) => {
        try {
            if (editingExpense) {
                await expensesApi.update(editingExpense.id, data);
                setEditingExpense(null);
            } else {
                await expensesApi.create(data);
            }
            await fetchExpenses();
        } catch (err) {
            console.error("Помилка збереження", err);
        }
    };

    const handleDelete = async (id: number) => {
        await expensesApi.delete(id);
        await fetchExpenses();
    };

    return (
        <div className="app-shell">
            {/* Хедер: заголовок + кнопка виходу */}
            <div className="app-header">
                <h2>Мої витрати</h2>
                <button onClick={logout} className="logout-button">
                    Вийти
                </button>
            </div>

            {/* Рядок загальної суми */}
            <div className="total-line-label">Загальна сума</div>
            <div className="total-line">
                {expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}{" "}
                <span className="currency">грн</span>
            </div>

            {/* Рядок фільтрації */}
            <div className="filter-row">
                <label htmlFor="periodFilter">Період: </label>
                <select
                    id="periodFilter"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as PeriodOption)}
                >
                    <option value="">Всі</option>
                    <option value="week">Тиждень</option>
                    <option value="month">Місяць</option>
                    <option value="3months">3 місяці</option>
                    <option value="custom">Свій діапазон</option>
                </select>

                {/* Умовний рендеринг для кастомного діапазону */}
                {period === "custom" && (
                    <span className="date-range">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span> — </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </span>
                )}
            </div>

            {/* Форма додавання/редагування */}
            <ExpenseForm
                onSubmit={handleSubmit}
                initialData={editingExpense ?? undefined}
            />

            {/* Список витрат */}
            <ExpenseList
                expenses={expenses}
                onDelete={handleDelete}
                onEdit={setEditingExpense}
            />
        </div>
    );
};
