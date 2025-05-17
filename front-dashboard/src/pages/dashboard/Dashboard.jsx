import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './css/dashboard.css';
import './css/calendario.css';
import Sidebar from '../../components/sidebar/Sidebar';
import CadastroEvento from './CriarEvento';
import Calendar from './js/calendario';
import ApexCharts from 'apexcharts';

function Dashboard() {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [eventoParaEditar, setEventoParaEditar] = useState(null);
  const chartRef = useRef(null);
  const inputBuscaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
  carregarEventos();
  
  // Verifica se o elemento do gráfico existe
  if (!chartRef.current) return;

  const opcoesBarra = {
    series: [{
      name: 'Eventos',
      data: [44, 55, 41, 67, 22, 43]
    }],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    colors: ['#72A603'],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      },
    },
    xaxis: {
      categories: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  const chart = new ApexCharts(chartRef.current, opcoesBarra);
  chart.render();

  return () => {
    chart.destroy();
  };
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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/api/eventos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error('Erro ao carregar eventos');
      }

      const eventosData = await response.json();
      setEventos(eventosData);
      setEventosFiltrados(eventosData);
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

  return (
    <div className="container-dashboards">
      <Sidebar/>
      <main className="conteudo-principal">
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

        <div className="conteudo">
          <div className="grid-projetos-dash">
            {renderizarEventos()}
          </div>

          <div id="conteudo-baixo">
            <div className="indice-eventos">
              <div ref={chartRef} id="grafico7"></div>
            </div>

            <div className="grid-estatisticas">
              <div className="cartao-estatistica">
                <h3>TOTAL DE EVENTOS</h3>
                <p className="numero-estatistica">{eventos.length}</p>
              </div>
              <div className="cartao-estatistica">
                <h3>INSCRITOS</h3>
                <p className="numero-estatistica">2000</p>
              </div>
              <div className="cartao-estatistica">
                <h3>PARTICIPANTES CONCLUIRAM 100%</h3>
                <p className="numero-estatistica">1590</p>
              </div>
            </div>
            
            <div className="wrapper">
              <Calendar eventos={eventos}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
