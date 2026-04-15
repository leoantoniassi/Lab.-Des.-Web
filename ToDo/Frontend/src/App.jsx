import { useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ToDoForm from "./Pages/ToDoForm";
import ToDoList from "./Pages/ToDoList";
import ToDoEdit from "./Pages/toDoEdit";
import api from "./Api/ToDoApi";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* max-w-3xl define o limite e mx-auto centraliza esse bloco */}
      <header className="max-w-3xl mx-auto mb-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">ToDo</h1>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/new" element={<ToDoForm />} />
          <Route path="/edit/:id" element={<ToDoEdit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
