// src/App.jsx
import { useState } from "react";
import Home from "./pages/Home";
import AddTransactionPage from "./pages/AddTransactionPage";
import BottomNavigation from "./components/BottomNavigation";
import axios from "axios";

axios.defaults.baseURL = 'https://baksometr.pythonanywhere.com/api/'

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {page === "home" && <Home />}
      {page === "add" && <AddTransactionPage onBack={() => setPage("home")} />}

      <BottomNavigation current={page} onNavigate={setPage} />
    </div>
  );
}

export default App;