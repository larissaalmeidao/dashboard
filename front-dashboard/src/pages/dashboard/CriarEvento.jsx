import ReactModal from "react-modal";
import React, { useState, useEffect } from 'react';
import './css/modalCadastro.css';

function CadastroEvento({ eventoParaEditar, onEventoSalvo, onFecharModal }) {
    const [modalAberta, setModalAberta] = useState(false);
    const [erros, setErros] = useState({});
    const [formData, setFormData] = useState({
        nome: '',
        tipo: '',
        descricao: '',
        dataI: '',
        horaI: '',
        horaF: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        capacidade: '',
        responsavel: '',
        banner: null
    });

    const validarCEP = (cep) => {
        return /^\d{5}-?\d{3}$/.test(cep);
    };

    const validarFormulario = () => {
        const novosErros = {};
        let valido = true;
    
        if (!formData.nome.trim()) {
            novosErros.nome = 'Nome do evento é obrigatório';
            valido = false;
        }
    
        if (!formData.tipo) {
            novosErros.tipo = 'Selecione um tipo de evento';
            valido = false;
        }
    
        if (!formData.descricao.trim()) {
            novosErros.descricao = 'Descrição é obrigatória';
            valido = false;
        }
    
        if (!formData.dataI) {
            novosErros.dataI = 'Data de início é obrigatória';
            valido = false;
        } else if (new Date(formData.dataI) < new Date()) {
            novosErros.dataI = 'Data não pode ser no passado';
            valido = false;
        }
    
        if (!formData.horaI) {
            novosErros.horaI = 'Hora de início é obrigatória';
            valido = false;
        }
    
        if (!formData.horaF) {
            novosErros.horaF = 'Hora de término é obrigatória';
            valido = false;
        } else if (formData.horaI && formData.horaF <= formData.horaI) {
            novosErros.horaF = 'Hora de término deve ser após a hora de início';
            valido = false;
        }
    
        // Validação para eventos presenciais
        if (formData.tipo === 'Presencial') {
            if (!formData.cep) {
                novosErros.cep = 'CEP é obrigatório';
                valido = false;
            } else if (!validarCEP(formData.cep)) {
                novosErros.cep = 'CEP inválido';
                valido = false;
            }
    
            if (!formData.logradouro) {
                novosErros.logradouro = 'Logradouro é obrigatório';
                valido = false;
            }
    
            if (!formData.numero) {
                novosErros.numero = 'Número é obrigatório';
                valido = false;
            }
    
            if (!formData.bairro) {
                novosErros.bairro = 'Bairro é obrigatório';
                valido = false;
            }
    
            if (!formData.cidade) {
                novosErros.cidade = 'Cidade é obrigatória';
                valido = false;
            }
    
            if (!formData.capacidade) {
                novosErros.capacidade = 'Capacidade é obrigatória';
                valido = false;
            } else if (isNaN(formData.capacidade)) {
                novosErros.capacidade = 'Capacidade deve ser um número';
                valido = false;
            }
        }
    
        if (!formData.responsavel) {
            novosErros.responsavel = 'Responsável é obrigatório';
            valido = false;
        }
    
        if (!eventoParaEditar && !formData.banner) {
            novosErros.banner = 'Banner é obrigatório';
            valido = false;
        }
    
        setErros(novosErros);
        return valido;
    };

    useEffect(() => {
        if (eventoParaEditar) {
            setFormData({
                nome: eventoParaEditar.nome || '',
                tipo: eventoParaEditar.tipo || '',
                descricao: eventoParaEditar.descricao || '',
                dataI: eventoParaEditar.dataI || '',
                horaI: eventoParaEditar.horaI || '',
                horaF: eventoParaEditar.horaF || '',
                cep: eventoParaEditar.cep || '',
                logradouro: eventoParaEditar.logradouro || '',
                numero: eventoParaEditar.numero || '',
                bairro: eventoParaEditar.bairro || '',
                cidade: eventoParaEditar.cidade || '',
                capacidade: eventoParaEditar.capacidade || '',
                responsavel: eventoParaEditar.responsavel || '',
                banner: null
            });
            setModalAberta(true);
        }
    }, [eventoParaEditar]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const enviarAgendamento = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return alert('Você precisa estar logado!');

        if (!formData.dataI || !formData.horaI || !formData.horaF) {
            return alert('Data e horários são obrigatórios!');
        }
        if (!validarFormulario()) {
            return;
        }

        try {
            let imagemId = null;
            if (formData.banner) {
                if (!formData.banner.type.match('image.*')) {
                    throw new Error('Apenas imagens são permitidas!');
                }

                const formDataImg = new FormData();
                formDataImg.append('image', formData.banner);
                
                const uploadResponse = await fetch('http://localhost:3000/api/images', {
                    method: 'POST',
                    body: formDataImg
                });
                
                if (!uploadResponse.ok) throw new Error('Falha ao enviar imagem');
                imagemId = (await uploadResponse.json()).id;
            }

            const url = eventoParaEditar 
                ? `http://localhost:3000/api/eventos/${eventoParaEditar.id}`
                : 'http://localhost:3000/api/eventos';

            const method = eventoParaEditar ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    ...formData,
                    imagemId 
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao cadastrar evento');
            }

            const result = await response.json();
            alert(result.message);
            setModalAberta(false);
            setFormData({
                nome: '',
                tipo: '',
                descricao: '',
                dataI: '',
                horaI: '',
                horaF: '',
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                cidade: '',
                capacidade: '',
                responsavel: '',
                banner: null
            });
            
            if (onEventoSalvo) {
                onEventoSalvo();
            }
        } catch (error) {
            alert(error.message || "Erro ao agendar. Verifique os dados e tente novamente.");
        }
    };

    const abrirModal = () => {
        setModalAberta(true);
        setFormData({
            nome: '',
            tipo: '',
            descricao: '',
            dataI: '',
            horaI: '',
            horaF: '',
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            cidade: '',
            capacidade: '',
            responsavel: '',
            banner: null
        });
    };

    const fecharModal = () => {
        setModalAberta(false);
        if (onFecharModal) {
          onFecharModal();
        }
      };

    const styleModal = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            height: '700px',
            width: '900px',
            borderRadius: '25px',
            transform: 'translate(-50%,-50%)',
            zIndex: 100
        }
    };

    return (
        <>
            <button type='button' onClick={abrirModal} className="botao-acao novo-evento">
                + Novo Evento
            </button>

            <ReactModal 
                style={styleModal} 
                isOpen={modalAberta} 
                onRequestClose={fecharModal} 
                ariaHideApp={false}
            >
                <div className="modal-cabecalho">
                    <h2>{eventoParaEditar ? 'Editar Evento' : 'Cadastrar Novo Evento'}</h2>
                    <button type='button' className='fechar-modal' onClick={fecharModal}>X</button>
                </div>

                <form id="formEvento" className="formulario" onSubmit={enviarAgendamento}>
                    <div className="campo-formulario">
                        <label htmlFor="nomeEvento">Nome do Evento</label>
                        <input 
                            type="text" 
                            id="nomeEvento" 
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            className={erros.nome ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.nome && <span className="mensagem-erro">{erros.nome}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="options">Modalidade</label>
                        <select 
                            name="tipo" 
                            id="options"
                            value={formData.tipo}
                            onChange={handleInputChange}
                            className={erros.tipo ? 'campo-invalido' : ''}
                        >
                            <option value="">-- Selecione --</option>  
                            <option value="Online">Online</option>
                            <option value="Presencial">Presencial</option>
                        </select>
                        {erros.tipo && <span className="mensagem-erro">{erros.tipo}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="descricaoEvento">Descrição</label>
                        <textarea 
                            id="descricaoEvento" 
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                            className={erros.descricao ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.descricao && <span className="mensagem-erro">{erros.descricao}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="dataInicioEvento">Data de Início</label>
                        <input 
                            type="date" 
                            id="dataInicioEvento" 
                            name="dataI"
                            value={formData.dataI}
                            onChange={handleInputChange}
                            className={erros.dataI ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.dataI && <span className="mensagem-erro">{erros.dataI}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="horaInicio">Hora Início</label>
                        <input 
                            type="time" 
                            id="horaInicio" 
                            name="horaI"
                            value={formData.horaI}
                            onChange={handleInputChange}
                            className={erros.horaI ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.horaI && <span className="mensagem-erro">{erros.horaI}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="horaFinal">Hora Final</label>
                        <input 
                            type="time" 
                            id="horaFinal" 
                            name="horaF"
                            value={formData.horaF}
                            onChange={handleInputChange}
                            className={erros.horaF ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.horaF && <span className="mensagem-erro">{erros.horaF}</span>}
                    </div>

                    <h2 id="localizacao">Local</h2>

                    <div className="campo-formulario">
                        <label htmlFor="cep">CEP</label>
                        <input 
                            type="text" 
                            id="cep" 
                            name="cep"
                            value={formData.cep}
                            onChange={handleInputChange}
                            className={erros.cep ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.cep && <span className="mensagem-erro">{erros.cep}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="logradouro">Logradouro</label>
                        <input 
                            type="text" 
                            id="logradouro" 
                            name="logradouro"
                            value={formData.logradouro}
                            onChange={handleInputChange}
                            className={erros.logradouro ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.logradouro && <span className="mensagem-erro">{erros.logradouro}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="numero">Número</label>
                        <input 
                            type="text" 
                            id="numero" 
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            className={erros.numero ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.numero && <span className="mensagem-erro">{erros.numero}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="bairro">Bairro</label>
                        <input 
                            type="text" 
                            id="bairro" 
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleInputChange}
                            className={erros.bairro ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.bairro && <span className="mensagem-erro">{erros.bairro}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="cidade">Cidade</label>
                        <input 
                            type="text" 
                            id="cidade" 
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                            className={erros.cidade ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.cidade && <span className="mensagem-erro">{erros.cidade}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="capacidade">Capacidade de pessoas</label>
                        <input 
                            type="text" 
                            id="capacidade" 
                            name="capacidade"
                            value={formData.capacidade}
                            onChange={handleInputChange}
                            className={erros.capacidade ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.capacidade && <span className="mensagem-erro">{erros.capacidade}</span>}
                    </div>

                    <h2 id="pessoas">Responsável</h2>

                    <div className="campo-formulario">
                        <label htmlFor="responsavel">Nome</label>
                        <input 
                            type="text" 
                            id="responsavel" 
                            name="responsavel"
                            value={formData.responsavel}
                            onChange={handleInputChange}
                            className={erros.capacidade ? 'campo-invalido' : ''}
                            required
                        />
                        {erros.capacidade && <span className="mensagem-erro">{erros.capacidade}</span>}
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="banner">Banner do evento</label>
                        <input 
                            type="file" 
                            name="banner" 
                            accept="image/*" 
                            id="banner" 
                            onChange={handleInputChange}
                            className={erros.banner ? 'campo-invalido' : ''}
                        />
                        {erros.banner && <span className="mensagem-erro">{erros.banner}</span>}
                        {eventoParaEditar && (
                            <p className="info-imagem">Deixe em branco para manter a imagem atual</p>
                        )}
                    </div>


                        <button type="submit" className="botao-salvar">
                            {eventoParaEditar ? 'Atualizar Evento' : 'Salvar Evento'}
                        </button>
                        {eventoParaEditar && (
                        <button 
                        type="button" 
                        className="botao-excluir"
                        onClick={async () => {
                            if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                            try {
                                const token = localStorage.getItem('token');
                                const response = await fetch(`http://localhost:3000/api/eventos/${eventoParaEditar.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                                });

                                if (!response.ok) throw new Error('Erro ao excluir evento');
                                
                                alert('Evento excluído com sucesso!');
                                setModalAberta(false);
                                if (onEventoSalvo) onEventoSalvo();
                            } catch (error) {
                                alert(error.message);
                            }
                            }
                        }}
                        >
                        Excluir Evento
                        </button>
                    )}
                        <button type="button" className="botao-cancelar" onClick={fecharModal}>
                            Cancelar
                        </button>
                </form>
            </ReactModal>
        </>
    );
}

export default CadastroEvento;