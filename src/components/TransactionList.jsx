function TransactionList({ transactions }) {
  if (transactions.length === 0)
    return <p className="text-gray-500">Нет транзакций</p>;

  return (
    <ul className="space-y-4">
      {transactions.map((tx) => (
        <li key={tx.id} className="bg-gray-50 p-4 rounded shadow flex justify-between items-center">
          <div>
            <p className="font-medium text-lg">{tx.title}</p>
            <p className="text-sm text-gray-500">{tx.category.emoji} {tx.category.title} — {tx.date}</p>
          </div>
          <div className={tx.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {tx.type === 'income' ? '+' : '-'}{tx.amount} сом
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;