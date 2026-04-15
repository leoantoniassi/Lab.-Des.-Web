import React from "react";

export default function ToDoItem({ todo, onDelete, onEnd, onEdit }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded">
      <div className="font-medium">{todo.titulo}</div>
      <div className="text-sm text-gray-600">{todo.descricao}</div>
      <div className="text-sm">
        Data Limite: {new Date(todo.dataLimite).toLocaleDateString()}
      </div>
      <div className="text-sm">Situação: {todo.situacao}</div>
      {todo.situacao === "Pendente" && (
        <>
          <button
            onClick={onEdit}
            className="text-sm px-2 py-1 bg-slate-600 text-white rounded"
          >
            Editar
          </button>
          <button
            onClick={onEnd}
            className="text-sm px-2 py-1 bg-indigo-600 text-white rounded"
          >
            Finalizar Tarefa
          </button>
        </>
      )}

      <button
        onClick={onDelete}
        className="text-sm px-2 py-2 bg-red-600 text-white rounded hover:text-red-800"
      >
        Excluir
      </button>

      <button
        onClick={onEnd}
        className="text-sm px-2 py-2 bg-yellow-600 text-white rounded hover:text-yellow-800"
      >
        mudar situação
      </button>


    </div>
  );
}
