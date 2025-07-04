import { useState, useEffect } from "react";
import axios from "axios";

function AddTransactionPage({ onBack }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Ошибка при загрузке категорий:", err));
  }, []);

  const handleDigit = (digit) => {
    setAmount((prev) => prev + digit);
  };

  const clear = () => setAmount("");
  const backspace = () => setAmount((prev) => prev.slice(0, -1));

  const handleSubmit = async () => {
    if (!amount || !categoryId) return;
    await axios.post("/transactions/", {
      title: type === 'income' ? "Доход" : "Расход",
      amount,
      type,
      date: new Date().toISOString().split("T")[0],
      category: categoryId,
    });
    onBack();
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between mb-4">
        <button onClick={onBack}>❌</button>
        <div className="flex gap-2 bg-gray-800 rounded-xl px-2 py-1">
          <button onClick={() => setType("expense")} className={type === "expense" ? "text-white" : "text-gray-400"}>Расход</button>
          <button onClick={() => setType("income")} className={type === "income" ? "text-white" : "text-gray-400"}>Доход</button>
        </div>
        <button onClick={clear}>🔁</button>
      </div>

      <div className="text-5xl font-bold text-center mb-4">{amount || 0} сом</div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[1,2,3,4,5,6,7,8,9,".",0,"←"].map((key) => (
          <button key={key} onClick={() => key === "←" ? backspace() : handleDigit(String(key))} className="bg-gray-700 text-white text-2xl py-3 rounded">
            {key}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-gray-800 text-white p-3 rounded">
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.emoji} {cat.title}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit} className="bg-green-500 w-full py-3 rounded text-white font-semibold text-lg">Сохранить</button>
    </div>
  );
}

export default AddTransactionPage;