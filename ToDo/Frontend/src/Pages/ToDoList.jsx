import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDoItem from "../Components/ToDoItem";
import { getTodos, deleteToDo, updatePartial } from "../Api/ToDoApi";

export default function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data.tarefas);
    } catch (err) {
      setError(err.message || "Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Excluir esta tarefa?")) {
      return;
    }
    await deleteToDo(id);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const handleUpdate = async (id) => {
    navigate(`/edit/${id}`);
  };

  const handleEnd = async (id) => {
    try {
      await updatePartial(id, { situacao: "Finalizada" });
      // Após a alteraçãoda situação no BD,
      // é alterada a situação na lista sem buscar novamente no BD
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, situacao: "Finalizada" } : todo,
        ),
      );
    } catch (error) {
      console.error("Erro ao finalizar tarefa:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-btween mb-4">
        <Link to="/new" className="text-sm text-blue-600">
          Nova Tarefa
        </Link>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-3">
        {todos?.length === 0 && !loading ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada</p>
        ) : (
          todos?.map((todo) => (
            <ToDoItem
              key={todo._id}
              todo={todo}
              onDelete={() => handleDelete(todo._id)}
              onEdit={() => handleUpdate(todo._id)}
              onEnd={() => handleEnd(todo._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
