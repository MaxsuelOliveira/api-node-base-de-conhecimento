import { useEffect, useState } from "react";

function App() {
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/artigos") // ajuste a URL conforme sua API
      .then((res) => res.json())
      .then((data) => setArtigos(data))
      .catch((err) => console.error("Erro ao buscar artigos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Base de Conhecimento</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {artigos.map((artigo) => (
          <div key={artigo.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">{artigo.titulo}</h2>
            <p className="text-sm text-gray-500">
              Setor: <strong>{artigo.setor_nome}</strong> | Categorias:{" "}
              <strong>{artigo.categoria_nome}</strong>
            </p>
            <p className="mt-2">{artigo.descricao}</p>

            {artigo.link && (
              <a
                href={artigo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                Acessar link
              </a>
            )}

            <p className="text-xs text-gray-400 mt-4">
              Criado em: {new Date(artigo.data_create).toLocaleString()}
              <br />
              Autor: {artigo.autor_nome}
            </p>

            {artigo.conteudo_html && (
              <div
                className="mt-4 prose max-w-full"
                dangerouslySetInnerHTML={{ __html: artigo.conteudo_html }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
