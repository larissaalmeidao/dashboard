import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastroUser.css';

import Logo from './../../assets/images/Logo.svg';
import user_svgrepo_com from './../../assets/images/user-svgrepo-com.png';
import email_svgrepo_com_1 from './../../assets/images/email-svgrepo-com 1.png';
import key_svgrepo_com_1 from './../../assets/images/key-svgrepo-com 1.png';
import redes from './../../assets/images/redes.png';

function CadastroUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userType: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null
  });
  
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.userType) newErrors.userType = 'Tipo de usuário é obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem';
    if (!formData.photo) newErrors.photo = 'Foto é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;
  
  try {
    let imagemId = null;
    
    // Upload da foto se existir
    if (formData.photo) {
      if (!formData.photo.type.match('image.*')) {
        throw new Error('Apenas imagens são permitidas!');
      }

      const formDataImg = new FormData();
      formDataImg.append('image', formData.photo);
      
      const uploadResponse = await fetch('http://localhost:3000/api/fotoPerfil', {
        method: 'POST',
        body: formDataImg
      });
      
      if (!uploadResponse.ok) throw new Error('Falha ao enviar imagem');
      imagemId = (await uploadResponse.json()).id;
    }

    const response = await fetch('http://localhost:3000/api/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    name: formData.name,
    tipo: formData.userType,
    telefone: formData.phone,
    cpf: formData.cpf,
    email: formData.email,
    password: formData.password,
    imagemId: imagemId  // Alterado de fotoPerfilId para imagemId
  })
});

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro no cadastro!');
    }

    const data = await response.json();
    alert(data.message || 'Cadastro realizado com sucesso!');
    navigate('/login');
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert(error.message || 'Erro ao cadastrar. Por favor, tente novamente.');
  }
};

  useEffect(() => {
    if (formData.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(formData.photo);
    } else {
      setPreview(null);
    }
  }, [formData.photo]);

  return (
    <>
      <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
        <div className="container w-container">
          <a href="index.html" id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb54a-57276ea9" className="logo w-nav-brand">
            <Link to='/'>
              <img src={Logo} loading="lazy" alt="Instituto Criativo"/>
            </Link>
          </a>

          <div id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb552-57276ea9" className="menu-mobile w-nav-button">
            <div className="w-icon-nav-menu"></div>
          </div>
        </div>
      </div>

      <div className='cadastro'>
        <div className='area-cadastro'>
          <h1 id="titulo">Cadastre-se</h1>

          <form className='cadastar' onSubmit={handleSubmit}>
            <div className='class-1'>
              <label>Nome</label>
              <div id="inputUsuario" className="inputGroup">
                <img src={user_svgrepo_com} alt="" id="user"/>
                <input 
                  id="name-user" 
                  name="name"
                  placeholder="Nome completo" 
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className='class-7'>
              <label>Tipo de usuário</label>
              <select 
                name="userType" 
                id="options"
                value={formData.userType}
                onChange={handleInputChange}
              >
                <option value="">-- Selecione --</option>  
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
                <option value="Administrativo">Administrativo</option>
              </select>
              {errors.userType && <span className="error-message">{errors.userType}</span>}
            </div>

            <div className='class-2'>
              <label>CPF</label>
              <div id="inputDocumento" className="inputGroup"> 
                <input 
                  id="documento-user" 
                  name="cpf"
                  placeholder="xxx.xxx.xxx-xx" 
                  type="text" 
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.cpf && <span className="error-message">{errors.cpf}</span>}
            </div>

            <div className='class-3'>
              <label>Telefone</label>
              <div id="inputTelefone" className="inputGroup">
                <input 
                  id="phone-user" 
                  name="phone"
                  placeholder="(11) 91234-5678" 
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className='class-8'>
                <label>Foto de perfil</label>
                <div id="inputFoto" className="inputGroup">
                    <input 
                    id="photo-user" 
                    name="photo"
                    type="file" 
                    accept="image/*" 
                    onChange={handleInputChange}
                    ref={fileInputRef}
                    />
                    <div className="image-preview-container">
                    {preview && (
                        <div className="image-preview-wrapper">
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="image-preview"
                        />
                        </div>
                    )}
                    </div>
                </div>
                {errors.photo && <span className="error-message">{errors.photo}</span>}
            </div>

            <div className='class-4'>
              <label>E-mail</label>
              <div id="inputEmail" className="inputGroup">
                <img src={email_svgrepo_com_1} alt="senha" id="mail"/>
                <input 
                  id="email-user" 
                  name="email"
                  placeholder="exemplo@gmail.com" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className='class-5'>
              <label>Senha</label>
              <div id="inputSenha" className="inputGroup">
                <img src={key_svgrepo_com_1} alt="email" id="key"/>
                <input 
                  id="senha-user" 
                  name="password"
                  placeholder="Senha" 
                  type="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className='class-6'>
              <label>Confirmar senha</label>
              <div id="inputSenhaRepetir" className="inputGroup">
                <img src={key_svgrepo_com_1} alt="email" id="key"/>
                <input 
                  id="senha-user-repetir" 
                  name="confirmPassword"
                  placeholder="Senha" 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" id="confirmar" className="btn">Confirmar</button>
          </form>
          <Link to="/login"><p id="irParaLogin">Já tem uma conta? Faça login.</p></Link>
        </div>
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
            <img src={redes} alt="redes"/>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CadastroUser;