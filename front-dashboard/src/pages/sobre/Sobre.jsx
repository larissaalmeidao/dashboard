import './sobre.css';
import { useState } from 'react';


import exDash from './../../assets/img/Group 53.png';
import ana from './../../assets/img/ana.png';
import lari from './../../assets/img/lari.png';
import eric from './../../assets/img/erik.png';
import vini from './../../assets/img/vini.png';
import git from './../../assets/img/github 1.png';
import ld from './../../assets/img/linkedin 1.png';
import Sidebar from '../../components/sidebar/Sidebar';
import Menu from '../../components/menu/menu';



function Sobre (){
    return(
        <div className='container-dashboards'>
            <Sidebar aberta={sidebarAberta} fechar={() => setSidebarAberta(false)} />
            <div class="conteudo-principal">
                <Menu onAbrirSidebar={() => setSidebarAberta(true)} />
            
            <div class="onda-fundo">
                <div class="sobre-conteudo">
                    <div>
                        <h2>DASHBOARD - INSTITUTO CRIATIVO</h2>
    
                    <p>
                        A gestão de projetos e atividades em organizações sem fins lucrativos (ONG) 
                        é essencial para o alcance de seus objetivos sociais e educacionais. Neste 
                        cenário, o Instituto Criativo se destaca ao promover a educação inclusiva e 
                        acessível. No entanto, a falta de organização das informações tem gerado problemas 
                        significativos na supervisão do processo e na avaliação das iniciativas. Com o 
                        intuito de solucionar essas questões, este projeto apresenta o desenvolvimento 
                        de um dashboard que centraliza e organiza as atividades, desafios e eventos da 
                        instituição. O sistema permitirá o acompanhamento em tempo real do progresso das 
                        iniciativas, oferecendo relatórios e gráficos automáticos que ajudarão na análise 
                        de desempenho e em decisões estratégicas. Nesse contexto, será avaliada a integração 
                        com APIs de redes sociais, que irão reforçar a comunicação e ampliar a visibilidade 
                        das iniciativas da instituição. Além de otimizar a gestão, o painel irá auxiliar 
                        na comunicação entre estudantes, educadores e parceiros, promovendo maior 
                        transparência nas informações da instituição. Dessa forma, o dashboard será uma 
                        ferramenta estratégica que não apenas melhora a administração das ações do 
                        Instituto Criativo, mas também aumenta a visibilidade dos resultados alcançados.
                    </p>
                    </div>
                
                    <img src={exDash} alt="dash" class="img-dash"/>
                </div>
            </div>
           
            

            <section class="desenvolvedores">
                <h2>Desenvolvedores</h2>
                <div class="card-desenvolvedores">
                    <div class="card">
                        <img src={ana}/>
                        <label>
                            <h4>Ana Clara</h4>
                            <a href="https://github.com/Clara495"><img src={git} class="icon"/></a>
                            <a href="https://www.linkedin.com/in/ana-c-de-souza-2b640922a/"><img src={ld} class="icon"/></a>
                        </label>
                    </div>

                    <div class="card">
                        <img src={eric}/>
                        <label>
                            <h4>Erik Raimundo</h4>
                            <a href="https://github.com/ErikRaimundo"><img src={git} class="icon"/></a>
                            <a href="https://www.linkedin.com/in/erik-raimundo-5811762b8/"><img src={ld} class="icon"/></a>
                        </label>
                    </div>

                    <div class="card">
                        <img src={lari}/>
                        <label>
                            <h4>Larissa Almeida</h4>
                            <a href="https://github.com/larissaalmeidao"><img src={git} class="icon"/></a>
                            <a href="https://www.linkedin.com/in/larissa-de-almeida/"><img src={ld} class="icon"/></a>
                        </label>
                        
                    </div>

                    <div class="card">
                        <img src={vini}/>
                        <label>
                            <h4>Vinicius Lima</h4>
                            <a href="https://github.com/Vinnywho"><img src={git} class="icon"/></a>
                            <a href="https://www.linkedin.com/in/vinicius-cardoso-de-lima-a9a918227/"><img src={ld} class="icon"/></a>
                        </label>
                    </div>

                </div>
            </section>
        </div>

        </div>
    )
}

export default Sobre;
