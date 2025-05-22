import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './Publicacao.css';
import Menu from '../../components/menu/menu';

function Publicacao() {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [photoData, setPhotoData] = useState({
    url: '',
    postUrl: '',
    status: '',
    isLoading: false,
    error: null
  });

  async function postToFacebook(e) {
    e.preventDefault();
    
    if (!imageUrl) {
      setPhotoData({
        ...photoData,
        status: 'Erro: Por favor, insira uma URL válida',
        error: 'URL vazia'
      });
      return;
    }

    const accessToken = 'EAATxvdUIBSoBO4GlQL7BFPY0x01Xxb8sygQ8hLTwPqewCl4ndNYLHlXbcrr9xGYgyPyyZCxzvQMK9jYuvxUnXGxMnLx36XTDRuGwoiP1ZAiSZAre0rEujQYSWedQQvMRRamCMxuxnBBai2uZAF7hWsLjJAUhjLa4bzpeHzEm8w3WNEAQFcZC5W5unnzqWAqvA7tpeMRAgV62IvSMOGyxp0yxKPJkZD';
    const pageId = '17841474737754305';

    setPhotoData({
      ...photoData,
      isLoading: true,
      status: 'Publicando no Instagram...',
      error: null
    });

    try {
      const imgCheck = await fetch(imageUrl, { method: 'HEAD' });
      if (!imgCheck.ok) {
        throw new Error('URL da imagem não acessível');
      }

      const apiUrl = new URL(`https://graph.facebook.com/v19.0/${pageId}/media`);
      apiUrl.searchParams.append('image_url', imageUrl);
      apiUrl.searchParams.append('caption', caption); // Usa a legenda do estado
      apiUrl.searchParams.append('access_token', accessToken);

      const response = await fetch(apiUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erro ao criar mídia');
      }

      const data = await response.json();

      const publishUrl = new URL(`https://graph.facebook.com/v19.0/${pageId}/media_publish`);
      publishUrl.searchParams.append('creation_id', data.id);
      publishUrl.searchParams.append('access_token', accessToken);

      const publishResponse = await fetch(publishUrl.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!publishResponse.ok) {
        const errorData = await publishResponse.json();
        throw new Error(errorData.error?.message || 'Erro ao publicar mídia');
      }

      setPhotoData({
        url: imageUrl,
        postUrl: `https://www.instagram.com/institutocriativo_?igsh=MTI3ejFqcTZ5bm5wMg==`,
        status: 'Publicado no Instagram com sucesso!',
        isLoading: false,
        error: null
      });

    } catch (error) {
      setPhotoData({
        ...photoData,
        status: `Erro: ${error.message}`,
        isLoading: false,
        error: error.message
      });
      console.error('Erro completo:', error);
    }
  }

  return (
    <div className="container-dashboards1">
      <Sidebar aberta={sidebarAberta} fechar={() => setSidebarAberta(false)} />
      <Menu onAbrirSidebar={() => setSidebarAberta(true)} />
      <main className="conteudo-principal1">
        <div className="container-publi">
          <div className="form-group">
            <label className='url-imagem-label'>URL DA IMAGEM</label>
            <input 
              type="text" 
              className='url-imagem'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Cole a URL da imagem aqui"
            />
          </div>

          <div className="form-group">
            <label className='caption-label'>LEGENDA</label>
            <textarea 
              className='caption-input'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Digite a legenda para a publicação"
              rows="3"
            />
          </div>
          
          <button 
            onClick={postToFacebook} 
            className="post"
            disabled={photoData.isLoading || !imageUrl}
          >
            {photoData.isLoading ? 'Publicando...' : 'Publicar no Instagram'}
          </button>
          
          {/* Restante do código permanece igual */}
          {photoData.isLoading && (
            <div className="status">Publicando, por favor aguarde...</div>
          )}
          
          {!photoData.isLoading && photoData.url && (
            <div className="photoContainer">
              <h2 className="titulo-foto">Foto Publicada:</h2>
              <img 
                src={photoData.url} 
                alt="Foto publicada no Instagram" 
                className="postedPhoto"
              />
              <div className="status">
                {photoData.status}
                {photoData.postUrl && (
                  <a 
                    href={photoData.postUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="vernoface"
                  >
                    Ver no Instagram
                  </a>
                )}
              </div>
            </div>
          )}
          
          {photoData.error && !photoData.isLoading && (
            <div className="error-message">
              {photoData.status}
              <p style={{fontSize: '1rem', marginTop: '10px'}}>
                Possíveis causas:
                <br/>- URL inválida ou inacessível
                <br/>- Token expirado ou inválido
                <br/>- Problemas de conexão
                <br/>- Permissões insuficientes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Publicacao;
