import { useNavigate, Link } from "react-router-dom";
import './sidebar.css';
import { useEffect, useState } from "react";

import info from './../../assets/img/info-svgrepo-com (2).png';
import painel from './../../assets/img/four-squares-button-of-view-options-svgrepo-com.png';
import iEventos from './../../assets/img/calendar-heart-svgrepo-com.png';
import publi from './../../assets/img/wrap-img-left-svgrepo-com.png';
import config from './../../assets/img/configuration-gear-options-preferences-settings-system-svgrepo-com 1.png';

function Sidebar({ aberta, fechar }) {
  const sidebarClass = `sidebar ${aberta ? 'active' : ''}`;
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: 'Carregando...',
        photo: 'caminho/para/imagem/padrao.png',
        role: 'Usuário'
    });

    useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            const response = await fetch('https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }

            const normalizeImageUrl = (url) => {
            
            let urlAjeitada = url.replace(/\\/g, '/').replace('uploads-profpic/uploads-profpic', 'uploads-profpic');
            
            if (urlAjeitada.startsWith('http')) return urlAjeitada;
            
            urlAjeitada = urlAjeitada.replace(/^\/*/, '');
            
            return `https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/${urlAjeitada}`;
            };

            const data = await response.json();
            setUserData({
            name: data.name || 'Usuário',
            photo: normalizeImageUrl(data.photo),
            role: data.tipo || 'Usuário'
            });
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    fetchUserData();
}, []);

const logout = async (e) => {
    e.preventDefault();
    try {
        localStorage.removeItem('token');
        navigate('/login');
        
        window.location.reload();
    } catch (error) {
        console.error('Erro durante o logout:', error);
    }
};

console.log('URL da foto:', userData.photo);

    return (
        <div data-theme="light">
    
            <div className="container-sidebar">
                <aside className={sidebarClass} id="sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <Link to="/">
                                <img src="https://github.com/user-attachments/assets/3daabcbc-0c3c-4446-a54a-1718903d78e8" 
                                     alt="logo" 
                                     className="logo"/>
                            </Link>
                            <button id="fecharSidebar" className="fechar-button" onClick={fechar}>✕</button>
                        </div>
                        <nav>
                            <ul>
                                <li><Link className="link" to="/dashboard"><img src={painel} alt="dashboards" className="painel"/>Painel</Link></li>
                                <li><Link className="link" to="/lista"><img src={iEventos} alt="Eventos" className="cal"/> Eventos</Link></li>
                                <li><Link className="link" to="/publi"><img src={publi} alt="Publicações" className="pubs"/>Publicações</Link></li>
                                <li><Link className="link" to="/sobre"><img src={info} alt="sobre" className="sobre"/> Sobre</Link></li>
                            </ul>
                        </nav>
                        <div className="tema-toggle">
                            <button id="temaToggle" className="tema-button">
                                <span className="tema-icon">🌙</span>
                                <span>Modo Escuro</span>
                            </button>
                        </div>
                    </div>

                    <div className="parteBaixo">
                        <div className="fotoPerfil">
                            <img
                                src={userData.photo}
                                alt="Foto do perfil"
                                onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/50';
                                }}
                            />
                        </div>
                        <div className="user-info">
                            <h3 className="nome">{userData.name}</h3>
                            <p className="cargo">{userData.role}</p>
                        </div>
                        <button className="logout" onClick={logout}>Sign Out</button>
                        <Link to="/configuracoes" className="config-link">
                            <img src={config} alt="configurações" />
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Sidebar;
