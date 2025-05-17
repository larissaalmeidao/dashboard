import Sidebar from '../../components/sidebar/Sidebar';
import CadastroEvento from '../dashboard/CriarEvento';
import './eventos.css';

function ListaEventos(){
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
      
    return(
        <div class="container-dashboards">

    <Sidebar/>
        <main class="conteudo-principal">
            <header class="cabecalho">
            
                <div class="container-busca">
                    <div class="caixa-busca">
                        <button class="botao-busca">
                            <span class="icone-busca"><div class="lupa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></div></span>
                        </button>
                        <input type="text" id="busca" placeholder="Pesquisar Eventos"/>
                    </div>
                    <CadastroEvento/>
                </div>
            </header>

          
            <div class="grid-projetos">
                <div id="grafico1" class="grafico"></div>
                <div id="grafico2" class="grafico"></div>
            </div>

        </main>
    
    </div>
    )  
}

export default ListaEventos;
