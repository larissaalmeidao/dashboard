// ========== CONSTANTES E VARIÁVEIS GLOBAIS ========== 
const sidebar = document.getElementById('sidebar');
const abrirSidebar = document.getElementById('abrirSidebar');
const fecharSidebar = document.getElementById('fecharSidebar');
const temaToggle = document.getElementById('temaToggle');
const temaIcon = temaToggle?.querySelector('.tema-icon');
const botaoNovoEvento = document.querySelector('.novo-evento');
const modalEvento = document.getElementById('modalEvento');
const modalInfo = document.getElementById('modalInfo');
const botaoInfo = document.querySelector('.btn-projeto');
let modoEscuro = false;

// ========== FUNÇÕES DE CONTROLE DA INTERFACE ==========
function alternarTema() {
    if (!temaToggle || !temaIcon) return;

    modoEscuro = !modoEscuro;
    document.documentElement.setAttribute('data-theme', modoEscuro ? 'dark' : 'light');
    temaIcon.textContent = modoEscuro ? '🌞' : '🌙';
    atualizarTemaGraficos(modoEscuro);
}

function abrirMenuLateral() {
    if (sidebar) sidebar.classList.add('active');
}

function fecharMenuLateral() {
    if (sidebar) sidebar.classList.remove('active');
}

function configurarModal() {
    if (botaoNovoEvento && modalEvento) {
        botaoNovoEvento.addEventListener('click', () => {
            modalEvento.style.display = 'flex';
        });

        document.querySelector('.fechar-modal')?.addEventListener('click', () => {
            modalEvento.style.display = 'none';
        });
    }

    if (botaoInfo && modalInfo) {
        botaoInfo.addEventListener('click', () => {
            modalInfo.style.display = 'flex';
        });
        
        document.querySelector('.fechar-modal').addEventListener('click', () => {
            modalInfo.style.display = 'none';
        });
    }
}

// ========== FUNÇÕES DE GRÁFICOS ==========
function inicializarGraficos() {
    const opcoesBarra = {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: { show: true },
            zoom: { enabled: true }
        },
        colors: ['#72A603'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT',
                '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'
            ]
        }
    };

    const grafico7 = new ApexCharts(document.querySelector('#grafico7'), opcoesBarra);
    grafico7.render();
}









//apenas provisório para testes

function renderizarGrafico(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} não encontrado`);
        return;
    }

    container.innerHTML = '';

    const porcentagem = index % 2 === 0 ? 17 : 45;
    const corPrincipal = index % 2 === 0 ? '#FFE910' : '#93F205';
    const corSecundaria = index % 2 === 0 ? '#FF254A' : '#1CEAE4';

    // Cria a estrutura do gráfico
    const graficoHTML = `
        <div class="grafico-custom">
            <div class="donut">
                <div class="slice" style="background: ${corPrincipal}; transform: rotate(${porcentagem * 3.6}deg);"></div>
                <div class="slice" style="background: ${corSecundaria};"></div>
            </div>
            <div class="percent">${porcentagem}%</div>
            <div class="legenda">Progresso</div>
        </div>
    `;

    container.innerHTML = graficoHTML;
}









// ========== FUNÇÕES DE EVENTOS ==========
async function carregarEventos() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
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
                window.location.href = 'login.html';
                return;
            }
            throw new Error('Erro ao carregar eventos');
        }

        const eventos = await response.json();
        console.log('Eventos carregados:', eventos);
        renderizarEventos(eventos);
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        const container = document.querySelector('.grid-projetos') || document.body;
        container.innerHTML = `<p class="erro-carregamento">Erro ao carregar eventos: ${error.message}</p>`;
    }
}

function renderizarEventos(eventos) {
    const container = document.querySelector('.grid-projetos');
    if (!container) return;

    container.innerHTML = eventos.length === 0 
        ? '<p class="sem-eventos">Nenhum evento cadastrado ainda.</p>'
        : '';

    eventos.forEach((evento, index) => {
        const graficoId = `grafico-${index}`;
        const cartao = document.createElement('div');
        cartao.className = 'cartao-projeto';
        
        cartao.dataset.evento = JSON.stringify(evento);
        cartao.innerHTML = `
            <div class="info-projeto">
                <h3>${evento.nome}</h3>
                <p>${evento.descricao}</p>
                <p style="color:#93F205">${evento.tipo}</p>
                <br>
                <p class="data">${evento.dataFormatada || ''}</p>
                <p class="horario">${evento.horarioInicio || ''} - ${evento.horarioFim || ''}</p>
            </div>
            <div id="${graficoId}" class="grafico"></div> 
        `;
        container.appendChild(cartao);
        
        renderizarGrafico(graficoId, index);
    });
}
// ========== FUNÇÕES DE AUTENTICAÇÃO ==========
async function logar(event) {
    event.preventDefault();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('senha')?.value;
    const messageElement = document.getElementById('message');

    if (!email || !password) {
        showError(messageElement, 'Email e senha são obrigatórios');
        return;
    }

    try {
        const response = await fetch('https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/api/login', {
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
        window.location.href = 'dashboard.html';
    } catch (error) {
        showError(messageElement, error.message);
    }
}

function cadastrarUsuario(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name-user')?.value,
        tipo: document.getElementById('options')?.value,
        telefone: document.getElementById('phone-user')?.value,
        cpf: document.getElementById('documento-user')?.value,
        email: document.getElementById('email-user')?.value,
        password: document.getElementById('senha-user')?.value,
        passwordRepeat: document.getElementById('senha-user-repetir')?.value
    };

    if (formData.password !== formData.passwordRepeat) return alert('As senhas não coincidem!');


    fetch('https://web-app-inovatech-dygwf7afhff7bfa5.brazilsouth-01.azurewebsites.net/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
        alert(data.message || 'Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    })
    .catch(async error => {
        const err = await error.json();
        alert(err.error || 'Erro no cadastro!');
    });
}

// ========== FUNÇÃO DE AGENDAMENTO ==========
async function enviarAgendamento(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Você precisa estar logado!');

    const eventoId = document.getElementById('eventoId')?.value;
    const isEdit = !!eventoId;

    const formData = {
        nome: document.getElementById('nomeEvento')?.value,
        tipo: document.getElementById('options')?.value,
        descricao: document.getElementById('descricaoEvento')?.value,
        dataI: document.getElementById('dataInicioEvento')?.value,
        horaI: document.getElementById('horaInicio')?.value,
        horaF: document.getElementById('horaFinal')?.value,
        cep: document.getElementById('cep')?.value,
        logradouro: document.getElementById('logradouro')?.value,
        numero: document.getElementById('numero')?.value,
        bairro: document.getElementById('bairro')?.value,
        cidade: document.getElementById('cidade')?.value,
        capacidade: document.getElementById('capacidade')?.value,
        responsavel: document.getElementById('responsavel')?.value
    };

    if (!formData.dataI || !formData.horaI || !formData.horaF) {
        return alert('Data e horários são obrigatórios!');
    }

    try {
        let imagemId = null;
        const file = document.getElementById('banner')?.files[0];
        if (file) {
            if (!file.type.match('image.*')) throw new Error('Apenas imagens são permitidas!');
            
            const formDataImg = new FormData();
            formDataImg.append('image', file);
            
            const uploadResponse = await fetch('http://localhost:3000/api/images', {
                method: 'POST',
                body: formDataImg
            });
            
            if (!uploadResponse.ok) throw new Error('Falha ao enviar imagem');
            imagemId = (await uploadResponse.json()).id;
        }

        const url = isEdit 
            ? `http://localhost:3000/api/eventos/${eventoId}`
            : 'http://localhost:3000/api/eventos';
            
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ ...formData, imagemId })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao cadastrar evento');
        }

        const result = await response.json();
        alert(result.message);
        modalEvento.style.display = 'none';
        event.target.reset();
        await carregarEventos();
    } catch (error) {
        alert(error.message || "Erro ao agendar. Verifique os dados e tente novamente.");
    }
}

// ========== FUNÇÕES UTILITÁRIAS ==========
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.color = 'red';
        element.style.display = 'block';
    } else {
        alert('Erro: ' + message);
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    
    if (temaToggle) temaToggle.addEventListener('click', alternarTema);
    if (abrirSidebar) abrirSidebar.addEventListener('click', abrirMenuLateral);
    if (fecharSidebar) fecharSidebar.addEventListener('click', fecharMenuLateral);
    configurarModal();

    
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('listaEventos.html')) {
        carregarEventos();
        inicializarGraficos();
    
        const formAgendamento = document.getElementById('formEvento');
        if (formAgendamento) {
            formAgendamento.addEventListener('submit', enviarAgendamento);
        }
    }

    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', logar);

    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', cadastrarUsuario);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove('active');
    }
});

window.carregarEventos = carregarEventos;

function abrirEdicaoEvento(evento) {
    const modalEvento = document.getElementById('modalEvento');
    if (!modalEvento) return;

    // Preencher o formulário com os dados do evento
    document.getElementById('nomeEvento').value = evento.nome;
    document.getElementById('options').value = evento.tipo;
    document.getElementById('descricaoEvento').value = evento.descricao;
    
    const [dia, mes, ano] = evento.dataFormatada.split('/');
    document.getElementById('dataInicioEvento').value = `${ano}-${mes}-${dia}`;
    
    document.getElementById('horaInicio').value = evento.horarioInicio;
    document.getElementById('horaFinal').value = evento.horarioFim;
    document.getElementById('cep').value = evento.cep;
    document.getElementById('logradouro').value = evento.logradouro;
    document.getElementById('numero').value = evento.numero;
    document.getElementById('bairro').value = evento.bairro;
    document.getElementById('cidade').value = evento.cidade;
    document.getElementById('capacidade').value = evento.capacidade;
    document.getElementById('responsavel').value = evento.responsavel;

    let idInput = document.getElementById('eventoId');
    if (!idInput) {
        idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.id = 'eventoId';
        document.getElementById('formEvento').appendChild(idInput);
    }
    idInput.value = evento.id;

    document.querySelector('.modal-cabecalho h2').textContent = 'Editar Evento';

    modalEvento.style.display = 'flex';
}
