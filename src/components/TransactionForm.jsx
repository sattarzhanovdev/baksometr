import { useState } from "react";

function TransactionForm({ categories, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    date: "",
    category_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", amount: "", type: "expense", date: "", category_id: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Название" className="border rounded px-3 py-2" required />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Сумма" className="border rounded px-3 py-2" required />
      <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2">
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
      </select>
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded px-3 py-2" required />
      <select name="category_id" value={form.category_id} onChange={handleChange} className="border rounded px-3 py-2 col-span-1 md:col-span-2">
        <option value="">Выберите категорию</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.emoji} {cat.title}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition">
        Добавить транзакцию
      </button>
    </form>
  );
}

export default TransactionForm;