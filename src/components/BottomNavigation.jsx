function BottomNavigation({ current, onNavigate }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around items-center py-2">
      <button onClick={() => onNavigate("home")} className={current === "home" ? "text-white" : "text-gray-500"}>🏠 Главная</button>
      <button className="text-gray-500">📊 Аналитика</button>
      <button onClick={() => onNavigate("add")} className="bg-white text-black text-xl rounded-full px-5 py-1 font-bold">＋</button>
      <button className="text-gray-500">⚖️ Бюджет</button>
      <button className="text-gray-500">⚙️ Настройки</button>
    </div>
  );
}

export default BottomNavigation;