import { useState, useEffect } from "react";

function App() {
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novoMorador, setNovoMorador] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novoTipo, setNovoTipo] = useState("");
  const [msgCadastro, setMsgCadastro] = useState("");

  const [tipoBusca, setTipoBusca] = useState("");
  const [reclamacoesEncontradas, setReclamacoesEncontradas] = useState([]);
  const [listaGeral, setListaGeral] = useState([]);
  const [msgBusca, setMsgBusca] = useState("");

  useEffect(() => {
    carregarTodas();
  }, []);

  const carregarTodas = async () => {
    try {
      const resposta = await fetch("http://localhost:5000/Reclamacoes/getAll");
      const dados = await resposta.json();
      if (dados.reclamacoes) setListaGeral(dados.reclamacoes);
    } catch (erro) {
      console.log("Erro ao carregar", erro);
    }
  };

  const registrarReclamacao = async (e) => {
    e.preventDefault();
    setMsgCadastro("");

    if (
      !novoTitulo ||
      !novaDescricao ||
      !novoMorador ||
      !novaData ||
      !novoTipo
    ) {
      setMsgCadastro("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:5000/Reclamacoes/Create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: novoTitulo,
          descricao: novaDescricao,
          morador: novoMorador,
          dataReclamacao: novaData,
          tipo: novoTipo,
        }),
      });

      if (resposta.status === 201) {
        setMsgCadastro("Sucesso!");
        setNovoTitulo("");
        setNovaDescricao("");
        setNovoMorador("");
        setNovaData("");
        setNovoTipo("");
        carregarTodas();
      } else {
        setMsgCadastro("Erro ao registrar.");
      }
    } catch (erro) {
      setMsgCadastro("Erro de conexão.");
    }
  };

  const buscarPorTipo = async (e) => {
    e.preventDefault();
    setMsgBusca("");
    setReclamacoesEncontradas([]);
    if (!tipoBusca) return;

    try {
      const resposta = await fetch(
        `http://localhost:5000/Reclamacoes/tipo/${tipoBusca}`,
      );
      if (resposta.status === 404) {
        setMsgBusca("Nenhuma reclamação encontrada.");
        return;
      }
      const dados = await resposta.json();
      setReclamacoesEncontradas(dados);
    } catch (erro) {
      setMsgBusca("Erro ao buscar.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
          Portal de Reclamações
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
            <h2 className="text-xl font-semibold mb-4">Nova Reclamação</h2>
            <form
              onSubmit={registrarReclamacao}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Título"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Morador"
                value={novoMorador}
                onChange={(e) => setNovoMorador(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={novaData}
                onChange={(e) => setNovaData(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <select
                value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Tipo...</option>
                <option value="lixo">Lixo</option>
                <option value="barulho">Barulho</option>
                <option value="iluminação">Iluminação</option>
                <option value="outro">Outro</option>
              </select>
              <textarea
                placeholder="Descrição..."
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white py-2 rounded font-bold"
              >
                Enviar
              </button>
            </form>
            {msgCadastro && (
              <div className="p-3 bg-orange-100 text-orange-800 rounded mt-3 text-sm">
                {msgCadastro}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-4">Filtrar por Tipo</h2>
            <form onSubmit={buscarPorTipo} className="flex gap-2 mb-4">
              <select
                value={tipoBusca}
                onChange={(e) => setTipoBusca(e.target.value)}
                className="flex-1 p-2 border rounded"
              >
                <option value="">Escolha...</option>
                <option value="lixo">Lixo</option>
                <option value="barulho">Barulho</option>
                <option value="iluminação">Iluminação</option>
                <option value="outro">Outro</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Buscar
              </button>
            </form>
            {msgBusca && (
              <div className="p-3 bg-red-100 text-red-700 rounded mb-4 text-sm">
                {msgBusca}
              </div>
            )}
            <div className="overflow-y-auto max-h-64 pr-2">
              {reclamacoesEncontradas.map((rec) => (
                <div
                  key={rec._id}
                  className="bg-slate-50 p-3 mb-2 border rounded text-sm"
                >
                  <p className="font-bold text-blue-800">{rec.titulo}</p>
                  <p className="text-gray-600 truncate">{rec.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4">Mural Geral</h2>
            <div className="overflow-y-auto max-h-[400px] pr-2">
              {listaGeral.map((rec) => (
                <div
                  key={rec._id}
                  className="bg-green-50 p-3 mb-3 border border-green-200 rounded"
                >
                  <span className="font-bold text-green-900 text-sm">
                    {rec.titulo}
                  </span>
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
                    {rec.tipo}
                  </span>
                  <p className="text-gray-700 text-sm my-1">{rec.descricao}</p>
                  <span className="text-xs text-gray-500">{rec.morador}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
