import Sidebar from '../../components/sidebar/Sidebar';
import CadastroEvento from '../dashboard/CriarEvento';
import './eventos.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef} from 'react';

function ListaEventos(){
  const [eventos, setEventos] = useState([]);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [eventoParaEditar, setEventoParaEditar] = useState(null);
    const inputBuscaRef = useRef(null);

    useEffect(() => {
  carregarEventos();
}, []);

  useEffect(() => {
    if (termoBusca.trim() === '') {
      setEventosFiltrados(eventos);
    } else {
      const resultados = eventos.filter(evento => 
        evento.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        evento.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
        evento.tipo.toLowerCase().includes(termoBusca.toLowerCase()) ||
        (evento.responsavel && evento.responsavel.toLowerCase().includes(termoBusca.toLowerCase()))
      );
      setEventosFiltrados(resultados);
    }
  }, [termoBusca, eventos]);


    const carregarEventos = async () => {


    try {
      const response = await fetch('https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/api/eventos', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const eventosData = await response.json();
  console.log("Dados da API:", eventosData);
  setEventos(eventosData);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
    
  };

  const handleBuscaChange = (e) => {
    setTermoBusca(e.target.value);
  };

  const limparBusca = () => {
    setTermoBusca('');
    inputBuscaRef.current.focus();
  };

  const abrirEdicaoEvento = (evento) => {
    setEventoParaEditar(evento);
  };

  const limparEdicaoEvento = () => {
    setEventoParaEditar(null);
  };

  const renderizarEventos = () => {
    if (termoBusca && eventosFiltrados.length === 0) {
      return <p className="sem-resultados">Nenhum evento encontrado para "{termoBusca}"</p>;
    }
    
    if (eventosFiltrados.length === 0) {
      return <p className="sem-eventos">Nenhum evento cadastrado ainda.</p>;
    }

    return eventosFiltrados.map((evento, index) => (
      <div 
        key={index} 
        className="cartao-projeto" 
        onClick={() => abrirEdicaoEvento(evento)}
      >
        <div className="info-projeto">
          <h3>{evento.nome}</h3>
          <p>{evento.descricao}</p>
          <p style={{color: '#93F205'}}>{evento.tipo}</p>
          <p className="data">{evento.dataFormatada || ''}</p>
          <p className="horario">{evento.horarioInicio || ''} - {evento.horarioFim || ''}</p>
        </div>
      </div>
    ));
  };
      
    return(
        <div class="container-dashboards">

    <Sidebar/>
        <main class="conteudo-principal">
            <header className="cabecalho">
          <button id="abrirSidebar" className="menu-button">
            <span className="menu-icon">
              <img src="../Dashboards/img/menu-svgrepo-com.png" alt="menu" className="menu"/>
            </span>
          </button>
          <div className="container-busca">
            <div className="caixa-busca">
              <button className="botao-busca">
                <span className="icone-busca">
                  <div className="lupa">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                  </div>
                </span>
              </button>
              <input 
                type="text" 
                id="busca" 
                ref={inputBuscaRef}
                placeholder="Pesquisar Eventos..."
                value={termoBusca}
                onChange={handleBuscaChange}
              />
              {termoBusca && (
                <button className="botao-limpar" onClick={limparBusca}>
                  ×
                </button>
              )}
            </div>
            <CadastroEvento 
              eventoParaEditar={eventoParaEditar}
              onEventoSalvo={() => {
                carregarEventos();
                limparEdicaoEvento();
              }}
              onFecharModal={limparEdicaoEvento}
            />
          </div>
        </header>

          
            <div className="grid-projetos">
            {renderizarEventos()}
            </div>

        </main>
    
    </div>
    )  
}

export default ListaEventos;
