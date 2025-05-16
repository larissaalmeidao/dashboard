import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

import Logo from './../../assets/images/Logo.svg';
import logoGrande from './../../assets/images/logoGrande.png';
import eye_close_svgrepo_com from './../../assets/images/eye-close-svgrepo-com.png';
import eye_svgrepo_com from './../../assets/images/eye-svgrepo-com.png';
import email_svgrepo_com_1 from './../../assets/images/email-svgrepo-com 1.png';
import key_svgrepo_com_1 from './../../assets/images/key-svgrepo-com 1.png';
import redes from './../../assets/images/redes.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (!email || !password) {
            alert('Email e senha são obrigatórios');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Credenciais inválidas');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
                <div className="container w-container">
                    <Link to="/" id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb54a-57276ea9" className="logo w-nav-brand">
                        <img src={Logo} loading="lazy" alt="Instituto Criativo"/>
                    </Link>

                    <div id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb552-57276ea9" className="menu-mobile w-nav-button">
                        <div className="w-icon-nav-menu"></div>
                    </div>
                </div>
            </div>

            <div id="areacolaborador" className="areacolaborador">
                <Link to="/">
                    <img src={logoGrande} alt="Instituto Criativo" id="logoGrande"/>
                </Link>

                <div id="dados">
                    <form name="login" onSubmit={handleLogin}>
                        <label>E-mail</label>
                        <div className="inputGroupEmail">
                            <img src={email_svgrepo_com_1} alt="email" id="mail"/>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="exemplo@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <label>Senha</label>
                        <div className="inputGroupSenha">
                            <img src={key_svgrepo_com_1} alt="senha" id="key"/>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="senha" 
                                name="senha" 
                                placeholder="Exemplo123@"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                className="viewPassword" 
                                type="button" 
                                title="Ver ou ocultar senha"
                                onClick={togglePasswordVisibility}
                            >
                                <img 
                                    id="toggleIcon" 
                                    className="eyeclosed" 
                                    src={showPassword ? eye_svgrepo_com : eye_close_svgrepo_com} 
                                    alt={showPassword ? "ícone olho aberto" : "ícone olho fechado"}
                                />
                            </button>
                        </div>
                        <p id="forgotPassword">Esqueci a Senha</p>

                        <div id="botoes">
                            <button type="submit" id="confirmar-login" className="btn">Confirmar</button>
                            <Link to="/usuario" id="dontHaveAccount" className="btn">Não tenho conta</Link>
                        </div>
                    </form>
                </div>
  
                <footer>
                    <div id="footer">
                        <div id="companhia">
                            <h3>Companhia</h3>
                            <p className="hiperlink">Sobre nós</p>
                            <p className="hiperlink">Serviços</p>
                            <p className="hiperlink">Politica de privacidade</p>
                            <p className="hiperlink">Cultura Organizacional</p>
                            <p className="hiperlink">Parceiros</p>
                        </div>

                        <div id="ajuda">
                            <h3>Ajuda</h3>
                            <p className="hiperlink">FAQ</p>
                            <p className="hiperlink">Contato</p>
                            <p className="hiperlink">Como doar</p>
                        </div>

                        <div id="siga">
                            <h3>Siga o Instituto</h3>
                            <Link to="/dashboard"><img src={redes} alt="redes"/></Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Login;