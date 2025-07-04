// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("month");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [transactions, filter]);

  const fetchData = async () => {
    const [txRes, catRes] = await Promise.all([
      axios.get("/transactions/"),
      axios.get("/categories/"),
    ]);

    setTransactions(txRes.data);
    setCategories(catRes.data);
  };

  const getCategory = (id) => {
    return categories.find((cat) => cat.id === id);
  };
  const applyFilter = () => {
    const now = new Date();
    let from;

    if (filter === "day") {
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (filter === "week") {
      const day = now.getDay();
      from = new Date(now);
      from.setDate(now.getDate() - day);
    } else if (filter === "month") {
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (filter === "year") {
      from = new Date(now.getFullYear(), 0, 1);
    } else {
      from = new Date("2000-01-01");
    }

    const filteredTx = transactions.filter((tx) => new Date(tx.date) >= from);
    setFiltered(filteredTx);

    const sum = filteredTx.reduce((acc, tx) => acc + (tx.type === "income" ? +tx.amount : -tx.amount), 0);
    setBalance(sum);
  };

  const totalByType = (type) =>
    filtered.filter((tx) => tx.type === type).reduce((acc, tx) => acc + +tx.amount, 0);

  console.log(filtered);
  

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Главная</h1>

      <div className="flex gap-2 overflow-x-auto mb-4 text-sm">
        {["day", "week", "month", "year"].map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-full border ${filter === key ? "bg-white text-black" : "border-gray-600 text-gray-400"}`}
          >
            {key === "day" && "1 день"}
            {key === "week" && "Неделя"}
            {key === "month" && "Месяц"}
            {key === "year" && "Год"}
          </button>
        ))}
      </div>

      <div className="flex justify-between mb-4 text-sm">
        <div className="bg-gray-800 p-3 rounded-xl w-[48%] text-center">
          <p className="text-green-400">Доход</p>
          <p className="text-white">{totalByType("income").toFixed(2)} сом</p>
        </div>
        <div className="bg-gray-800 p-3 rounded-xl w-[48%] text-center">
          <p className="text-red-400">Расход</p>
          <p className="text-white">{totalByType("expense").toFixed(2)} сом</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-center text-xl">Баланс: {balance.toFixed(2)} сом</p>
      </div>

      <h2 className="text-lg mb-2">Недавние транзакции</h2>
      <div className="space-y-2">
        {filtered.slice(0, 5).map((tx) => (
          <div key={tx.id} className="bg-gray-800 p-3 rounded-xl flex justify-between items-center">
            <div>
              <p className="font-medium">{getCategory(tx.category)?.emoji} {getCategory(tx.category)?.title}</p>
              <p className="text-xs text-gray-400">{tx.date}</p>
            </div>
            <p className={tx.type === "income" ? "text-green-400" : "text-red-400"}>{tx.type === "income" ? "+" : "-"}{(+tx.amount).toLocaleString()} сом</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;