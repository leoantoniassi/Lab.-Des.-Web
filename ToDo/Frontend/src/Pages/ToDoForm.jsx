import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToDo } from "../Api/ToDoApi";
import { formToJSON } from "axios";

export default function ToDoForm() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [situacao, setSituacao] = useState("Pendente");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createToDo({ titulo, descricao, dataLimite, situacao });
      navigate("/");
    } catch (error) {
      alert("Erro ao criar a tarefa: " + (error.message || "Erro"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block text-sm">Título</label>
        <input
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Descrição */}
      <div>
        <label className="block text-sm">Descrição</label>
        <textarea
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Data Limite */}
      <div>
        <label className="block text-sm">Data Limite</label>
        <input
          required
          value={dataLimite}
          onChange={(e) => setDataLimite(e.target.value)}
          type="date"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center agp-3">
        <button
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
