import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, updateAll } from "../Api/ToDoApi";

export default function ToDoEdit() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [situacao, setSituacao] = useState("");
  const [saving, setSaving] = useState(false);
  // todo guarda a tarefa retornada do getOne
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getOne(id)
        .then((res) => {
          const data = res.data.tarefa;
          // setTodo(data);
          setTitulo(data.titulo);
          setDescricao(data.descricao);
          setDataLimite(data.dataLimite);
          setSituacao(data.situacao);
          setDataLimite(new Date(data.dataLimite).toISOString().split("T")[0]);
          setLoading(true);
        })
        .catch((err) => {
          console.error("Erro ao carregar tarefa:", err);
          alert("erro ao carregar a tarefa");
          navigate("/");
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateAll(id, { titulo, descricao, dataLimite, situacao });
      navigate("/");
    } catch (error) {
      console.log("Erro ao alterar a tarefa: " + (error.message || "Erro"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <input type="hidden" value={situacao} />
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
          {saving ? "Alterando..." : "Alterar"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
