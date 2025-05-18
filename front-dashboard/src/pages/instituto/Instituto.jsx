import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './webflow.css';
import './instituto-criativo.webflow.css';
import './slider.css';

import carlos_albertini from './../../assets/images/carlos_albertini.jpg';
import esm_usp from './../../assets/images/esm_usp.jpg';
import fatec_mogi from './../../assets/images/fatec_mogi.jpg';
import fatec_osasco from './../../assets/images/fatec_osasco.jpg';
import felipe_almeida from './../../assets/images/felipe_almeida.jpg';
import foto_criancas from './../../assets/images/foto_criancaas.jpg';
import foto_lucy from './../../assets/images/foto_lucy.jpg';
import google from './../../assets/images/google.jpg';
import icon_books from './../../assets/images/icon_books.png';
import icon_briefcase from './../../assets/images/icon_briefcase.png';
import icon_heart from './../../assets/images/icon_heart.png';
import icon_missao from './../../assets/images/icon_missao.png';
import icon_rocket from './../../assets/images/icon_rocket.png';
import icon_valores from './../../assets/images/icon_valores.png';
import icon_visao from './../../assets/images/icon_visao.png';
import icon_whatsapp from './../../assets/images/icon-whatsapp.svg';
import imb from './../../assets/images/imb.jpg';
import joao_querlon from './../../assets/images/joao_querlon.jpg';
import joaquim_roberto from './../../assets/images/joaquim_roberto.jpg';
import Logo from './../../assets/images/Logo.svg';
import lucy_mari from './../../assets/images/lucy_mari.jpg';
import marcos_brito from './../../assets/images/marcos_brito.jpg';
import microsoft from './../../assets/images/microsoft.jpg';
import Rectangle_40voluntario from './../../assets/images/Rectangle-40voluntario.jpg';
import Rectangle_67voluntario from './../../assets/images/Rectangle-67voluntario.jpg';
import Rectangle_69voluntario from './../../assets/images/Rectangle-69voluntario.jpg';
import Rectangle_72voluntario from './../../assets/images/Rectangle-72voluntario.jpg';
import Rectangle_73voluntario from './../../assets/images/Rectangle-73voluntario.jpg';
import Rectangle_74voluntario from './../../assets/images/Rectangle-74voluntario.jpg';
import Rectangle_75voluntario from './../../assets/images/Rectangle-75voluntario.jpg';
import Rectangle_76voluntario from './../../assets/images/Rectangle-76voluntario.jpg';
import Rectangle_79voluntario from './../../assets/images/Rectangle-79voluntario.jpg';
import Rectangle_83voluntario from './../../assets/images/Rectangle-83voluntario.jpg';
import Rectangle_85voluntario from './../../assets/images/Rectangle-85voluntario.jpg';
import Rectangle_86voluntario from './../../assets/images/Rectangle-86voluntario.jpg';
import Rectangle_87voluntario from './../../assets/images/Rectangle-87voluntario.jpg';
import Rectangle_89voluntario from './../../assets/images/Rectangle-89voluntario.jpg';
import Rectangle_92voluntario from './../../assets/images/Rectangle-92voluntario.jpg';
import Rectangle_95voluntario from './../../assets/images/Rectangle-95voluntario.jpg';
import rodrigo_assirati from './../../assets/images/rodrigo_assirati.jpg';
import sebrae from './../../assets/images/sebrae.jpg';
import slide_1 from './../../assets/images/slide-1.jpg';
import slide_2 from './../../assets/images/slide-2.jpg';
import slide_3 from './../../assets/images/slide-3.jpg';
// import spotlight_poi3 from './../../assets/images/spotlight: poi3.png';
// import transparent from './../../assets/images/transparent.png';
import univesp from './../../assets/images/univesp.jpg';
import usp from './../../assets/images/usp.jpg';


function Instituto (){

    const [currentImage, setCurrentImage] = useState(1);
    const [menuAberto, setMenuAberto] = useState(false); // Estado para controlar o menu móvel

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => {
                if (prev >= 3) {
                    return 1;
                } else {
                    return prev + 1;
                }
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const alternarMenu = () => {
     setMenuAberto(!menuAberto);
    };

    return(
        <div data-wf-page="60fc6fd742d4098157276ea9" data-wf-site="60fc6fd742d40922fd276ea8">

            <head>
                <title>Instituito Criativo - Educação criativa e inovadora</title>
                <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
                <meta name="color-scheme" content="light"/>
            </head>


        <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
            <div class="container w-container">
                <a href="#" id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb54a-57276ea9" class="logo w-nav-brand">
                    <img src={Logo} loading="lazy" alt="Instituto Criativo"/>
                </a>
                <nav role="navigation" id="w-node-fdffd808-9d62-3cfe-7b66-fba621edb54b-57276ea9" 
                         className={`nav-menu w-nav-menu ${menuAberto ? 'w--nav-menu-open' : ''}`}>
                        <a href="#sobre" className="nav-item w-nav-link"><button className="outros">Sobre</button></a>
                        <a href="#segmentos" className="nav-item w-nav-link"><button className="outros1">Segmento</button></a>
                        <a href="#impacto-social" className="nav-item w-nav-link"><button className="outros2">Impacto Social</button></a>
                        <a href="#volutarios" className="nav-item w-nav-link"><button className="outros3">Colaboradores</button></a> 
                        <a href="#marcas" className="nav-item w-nav-link"><button className="outros4">Marcas</button></a>
                        <Link className="nav-item w-nav-link" to="/login"><button id="colab">Área do Colaborador</button></Link>
                </nav>
                <div id="w-node-_972faf08-b541-cf96-6ea6-788a36200efa-57276ea9" class="right-itens">
                    <a href="https://api.whatsapp.com/send?phone=5511910747492&amp;text=Quero%20falar%20sobre%20o%20Instituto%20Criativo" target="_blank" class="icon-button w-inline-block">
                        <img src={icon_whatsapp} loading="lazy" alt="WhatsApp" class="image"/>
                    </a>
                    <a href="https://www.paypal.com/donate/?cmd=_s-xclick&amp;hosted_button_id=EYE7VJQTJKGVE&amp;source=url" target="_blank" class="secondary-button header w-button">Faça uma doação</a>
                </div>

                <div
                    className={`menu-mobile w-nav-button ${menuAberto ? 'w--open' : ''}`}
                    onClick={alternarMenu}
                    >
                    <div className="w-icon-nav-menu"></div>
                    </div>
                    {menuAberto && (
                    <div className="menu-mobile-content">
                        <a href="#sobre" className="nav-item"><button className="outros">Sobre</button></a>
                        <a href="#segmentos" className="nav-item"><button className="outros1">Segmento</button></a>
                        <a href="#impacto-social" className="nav-item"><button className="outros2">Impacto Social</button></a>
                        <a href="#volutarios" className="nav-item"><button className="outros3">Colaboradores</button></a>
                        <a href="#marcas" className="nav-item"><button className="outros4">Marcas</button></a>
                        <Link to="/login" className="nav-item"><button id="colab">Área do Colaborador</button></Link>
                    </div>
                    )}
                
            </div>

        </div>

        <div id="tudo">

            <div class="section hero wf-section">
                <div class="text-ghost-decoration">
                    Educação criativa<br/>e inovadora
                </div>
                <div class="w-layout-grid grid-hero">
                    <h1 id="w-node-_45f64562-343d-cc68-3332-13d91cbe7367-57276ea9" class="heading">Educação criativa e inovadora</h1>
                    <div class="section-subtitle">O Instituto Criativo é uma ONG que nasceu para transformar a vida das pessoas.</div>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeG9lzGfHVSifOnKUA7CdMQSI_L8o0m-WXm2jucjtVtJXuqWw/viewform" target="_blank" class="primary-button w-button">Quero ser criativo</a>
                </div>
            </div>

            <section class="slider">
                <div class="slides">

                    <input type="radio" name="btn-radio" id="radio1"/>
                    <input type="radio" name="btn-radio" id="radio2"/>
                    <input type="radio" name="btn-radio" id="radio3"/>
        
                    <div class="slide primeiro">
                        <img class="img-desktop" src={slide_1} alt="slide 1"/>
                    </div>
        
                    <div class="slide">
                        <img class="img-desktop" src={slide_2} alt="slide 2"/>
                    </div>

                    <div class="slide">
                        <img class="img-desktop" src={slide_3} alt="slide 3"/>
                    </div>
                </div>

                <div class="navigation-auto">
                    <div class="auto-btn1"></div>
                    <div class="auto-btn2"></div>
                    <div class="auto-btn3"></div>
                </div>
    
                <div class="manual-navigation">
                    <label for="radio1" class="manual-btn"></label>
                    <label for="radio2" class="manual-btn"></label>
                    <label for="radio3" class="manual-btn"></label>
                </div>
            </section>

        <br/>
        <br/>
        <br/>
        <br/>
            <section id="sobre" class="section conteiner-sobre wf-section">
                <div class="w-layout-grid  sobre-instituto">
                    
                    <div id="w-node-_651eaaa4-3ef3-6803-f9da-aebe7c41478b-57276ea9" class="sobre-content">
                        <h2 id="w-node-_9d1485ff-35b9-becf-f876-67dcdb23fd9b-57276ea9" class="section-title">Sobre</h2>
                        <p class="paragraph">O Instituto Criativo é uma ONG que nasceu para transformar a vida das pessoas por meio da educação criativa e inovadora, empoderando-as de conhecimento de qualidade e diferenciado que são aplicados nos estudos, negócios e na própria vida contribuindo com a evolução da sociedade.</p>
                    </div>

                    <div id="w-node-dd9c17f0-2ef0-4f98-e529-b046f030a828-57276ea9" class="mvs-content">

                        <div id="w-node-_09c71556-2432-e728-f0cf-ad59a6e8e324-57276ea9" class="miss-o-content">
                            <img src={icon_missao} loading="lazy" width="32" alt="" class="msv-icon"/>
                            <div id="w-node-c561eabc-41af-6403-d8ab-8c52e214149d-57276ea9" class="msv-title">Missão</div>
                            <p id="w-node-e81f1f7c-0cb8-2221-a568-53a867905306-57276ea9" class="msv-text">Desenvolver e compartilhar projetos de educação criativa e inovadora que transformam a sociedade.</p>
                        </div>

                        <div id="w-node-_6c8c823d-6739-ccb0-c462-2762b95f1058-57276ea9" class="visao-content-copy">
                            <img src={icon_visao} loading="lazy" width="32" alt="" class="msv-icon"/>
                            <div id="w-node-_6c8c823d-6739-ccb0-c462-2762b95f105a-57276ea9" class="msv-title">Visão</div>
                            <p id="w-node-_6c8c823d-6739-ccb0-c462-2762b95f105c-57276ea9" class="msv-text">Ser referência na educação, empreendedorismo e eventos criativos por meio do aprendizado inovador.</p>
                        </div>

                        <div id="w-node-_7182e2e2-0a71-f306-5aad-47ec494b465f-57276ea9" class="valores-content-copy">
                            <img src={icon_valores} loading="lazy" width="32" id="w-node-_7182e2e2-0a71-f306-5aad-47ec494b4660-57276ea9" alt="" class="msv-icon"/>
                            <div id="w-node-_7182e2e2-0a71-f306-5aad-47ec494b4661-57276ea9" class="msv-title">Valores</div>

                            <div id="w-node-_8e96b85b-8bb4-caf4-790b-9a2395fdeb40-57276ea9" class="w-layout-grid valores-list">
                                <ul id="w-node-_7dc295db-018c-983a-0cc2-6b0be02dce1d-57276ea9" role="list" class="list">
                                    <li class="list-item">Sustentabilidade</li>
                                    <li class="list-item">Qualidade efetiva</li>
                                    <li class="list-item">Criatividade e inovação</li>
                                </ul>
                                <ul id="w-node-d23f6473-2cb4-1a80-8277-5b3f73e1fc40-57276ea9" role="list" class="list-2">
                                    <li class="list-item">Ética, respeito e honestidade</li>
                                    <li class="list-item">Colaboração, comprometimento e união</li>
                                    <li class="list-item">Conhecimento e aprendizagem qualitativa</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            <section id="segmentos" class="section conteiner segmentos wf-section">
                <div class="w-layout-grid grid-content">

                    <div id="w-node-_088cb91d-21c2-791f-d4cf-7ff007b3c04a-57276ea9" class="header-section">
                        <h2 class="section-title">Conheça nossos segmentos</h2>
                        <div class="section-title ghost">Conheça nossos segmentos</div>
                    </div>

                    <div class="w-layout-grid segmentos">
                        
                        <div class="w-layout-grid segmento-item">
                            <div id="w-node-d2786f4e-0438-ab72-35eb-201585e41265-57276ea9" class="segmento-icon">
                                <img src={icon_books} loading="lazy" width="32" alt="" class="icon"/>
                            </div>
                            <div class="w-layout-grid segmento-info">
                                <div class="w-layout-grid segmento-header">
                                    <h3 class="segmento-title">Aprendizado</h3>
                                    <div class="segmento-subtitle">5 a 21 anos</div>
                                </div>
                                <p class="paragraph alternative">Projeto de incentivo ao raciocínio lógico de crianças para desenvolver seu pensamento crítico, empreendedorismo, matemática e computação.</p>
                            </div>
                        </div>

                        <div class="w-layout-grid segmento-item">
                            <div id="w-node-_7f4a4550-d21e-ee42-dc73-81dd59c32150-57276ea9" class="segmento-icon brown">
                                <img src={icon_briefcase} loading="lazy" width="32" alt="" class="icon"/>
                            </div>
                            <div class="w-layout-grid segmento-info">
                                <div class="w-layout-grid segmento-header">
                                    <h3 class="segmento-title">Primeiro emprego</h3>
                                    <div class="segmento-subtitle">16 a 20 anos</div>
                                </div>
                                <p class="paragraph alternative">Jovens em busca do primeiro emprego, para fornecer competências e habilidades, desenvolvimento pessoal e conhecimentos necessários para ingressar no mercado de trabalho.</p>
                            </div>
                        </div>

                        <div class="w-layout-grid segmento-item">
                            <div id="w-node-_3729af25-eb39-f8b8-dd5d-d7f797ed7a77-57276ea9" class="segmento-icon gray">
                                <img src={icon_rocket} loading="lazy" width="32" alt="" class="icon"/>
                            </div>
                            <div class="w-layout-grid segmento-info">
                                <div class="w-layout-grid segmento-header">
                                    <h3 class="segmento-title">Recolocação</h3>
                                    <div class="segmento-subtitle">21 a 60 anos</div>
                                </div>
                                <p class="paragraph alternative">Projeto de incentivo ao raciocínio lógico de crianças para desenvolver seu pensamento crítico, empreendedorismo, matemática e computação.</p>
                            </div>
                        </div>

                        <div class="w-layout-grid segmento-item">
                            <div id="w-node-_511d3bc0-eb25-2653-60b8-73f6c2c9dd1a-57276ea9" class="segmento-icon red">
                                <img src={icon_heart }loading="lazy" width="32" alt="" class="icon"/>
                            </div>
                            <div class="w-layout-grid segmento-info">
                                <div class="w-layout-grid segmento-header">
                                    <h3 class="segmento-title">Bem-estar</h3>
                                    <div class="segmento-subtitle">+ 50 anos</div>
                                </div>
                                <p class="paragraph alternative">Promovendo assistência para desenvolvimento social, por meio de atividades de conversação, terapias, doação de alimentos e palestras de reeducação da mente.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div class="section container wf-section">
                <div class="ajude-o-instituto">
                    <h2 id="w-node-_078c1db8-5907-16cc-8e53-32ae906f6bb5-57276ea9" class="section-title doacao">Ajude o instituto criativo a transformar a sociedade</h2>
                    <a id="w-node-e50dcbbf-d7ea-0407-6b8b-5ee5c493c457-57276ea9" href="https://docs.google.com/forms/d/e/1FAIpQLSeG9lzGfHVSifOnKUA7CdMQSI_L8o0m-WXm2jucjtVtJXuqWw/viewform" target="_blank" class="primary-button">Quero ser criativo</a>
                    <a id="w-node-_302613d6-fe27-e94c-17b3-5f2f71b5e28d-57276ea9" href="https://www.paypal.com/donate/?cmd=_s-xclick&amp;hosted_button_id=EYE7VJQTJKGVE&amp;source=url" target="_blank" class="secondary-button">Faça uma doação</a>
                </div>
            </div>

            <section id="impacto-social" class="section conteiner wf-section">
                <div class="grid-content criatividade">

                    <div id='impacto'>

                        <div className='pt1'>
                            <div id="w-node-_3954399c-6e7d-c33b-beae-c71760ab2031-57276ea9" class="header-section">
                                <h2 class="section-title">A criatividade muda pessoas</h2>
                                <div class="section-title ghost">A Criatividade muda as pessoas</div>
                            </div>

                            <div id="w-node-aa47b911-8c21-0f56-b490-074f1d43289e-57276ea9" class="w-layout-grid big-numbers">

                                <div id="w-node-_4533f94e-ef79-19d4-5d43-013108e4e616-57276ea9" class="w-layout-grid number">
                                    <div class="number-text">
                                        100<strong class="bold-text">+</strong>
                                    </div>
                                    <div class="number-title">Projetos criativos</div>
                                </div>

                                <div id="w-node-_8d30f646-d459-fe42-685a-ee117ec4920c-57276ea9" class="w-layout-grid number">
                                    <div class="number-text">
                                        2.500<strong class="bold-text">+</strong>
                                    </div>
                                    <div class="number-title">Educadores e Pais desenvolvidos</div>
                                </div>

                                <div id="w-node-_83b7f143-ca8d-c3a3-9de4-d6ee14802660-57276ea9" class="w-layout-grid number">
                                    <div class="number-text">
                                        20.000<strong class="bold-text">+</strong>
                                    </div>
                                    <div class="number-title">Estudantes impactados</div>
                                </div>

                                <div id="w-node-c679f5ee-8c25-3c07-75ba-6b58c18f4d89-57276ea9" class="w-layout-grid number">
                                    <div class="number-text">
                                        30.000<strong class="bold-text">+</strong>
                                    </div>
                                    <div class="number-title">Pessoas alcançadas</div>
                                </div>
                            </div>
                        </div>

                        <div className='pt2'>
                            
                            <div id="w-node-_76eb2031-9422-d711-e40a-24ef3edb10e0-57276ea9" class="instituto-photos">
                                <img src={foto_lucy} loading="lazy" width="348" id="w-node-f462db69-2ec8-b853-b187-af31b313ff02-57276ea9" sizes="(max-width: 479px) 100vw, 348px" alt="" class="photo"/>
                                <img src={foto_criancas} loading="lazy" width="236" id="w-node-_6c55e156-3f24-eec1-b0fb-010cc7810738-57276ea9" alt="" class="photo sob"/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="volutarios" class="section conteiner wf-section">
                <div class="w-layout-grid grid-content">

                    <div id="w-node-_156f22e1-d34a-f5f8-c1be-c76c659ef47f-57276ea9" class="header-section">
                        <h2 class="section-title">Parceiros e voluntários</h2>
                        <div class="subtitle-section">Quem nos ajuda nessa incrível jornada</div>
                        <div class="section-title ghost">Parceiros e voluntários</div>
                    </div>

                    <div class="parceiros-content">

                        <div id="w-node-_7b8a81d5-6fb8-ab71-0db7-d06907345d7e-57276ea9" class="w-layout-grid parceiro-big">
                            <img src={lucy_mari} loading="lazy" width="164" alt="" class="parceiro-avatar"/>
                            <div id="w-node-_4104d73f-f347-3de8-b445-a28be866a3f2-57276ea9" class="w-layout-grid parceiro-info">
                                <div id="w-node-_8de0689e-eaef-2104-143c-7f12dd80e5c3-57276ea9" class="w-layout-grid parceiro-header">
                                    <div class="parceito-name">Lucy Mari</div>
                                    <div id="w-node-_6a63578c-e853-f2d1-fee6-6fc99022ce6b-57276ea9" class="parceito-ocupation">Presidente e fundadora</div>
                                </div>
                                <div class="parceiro-about">Empresária, educadora, psicoterapeuta, formada em matemática, mestre em ciência da computação, MBA em educação e doutora em engenharia de computação pela USP</div>
                            </div>
                        </div>

                        <div id="w-node-b0a658db-dbac-b2cb-b6d2-e9f7caa34d9b-57276ea9" class="w-layout-grid parceiro-big">
                            <img src={rodrigo_assirati} loading="lazy" width="164" alt="" class="parceiro-avatar"/>
                            <div id="w-node-b0a658db-dbac-b2cb-b6d2-e9f7caa34d9d-57276ea9" class="w-layout-grid parceiro-info">
                                <div id="w-node-b0a658db-dbac-b2cb-b6d2-e9f7caa34d9e-57276ea9" class="w-layout-grid parceiro-header">
                                    <div id="w-node-b0a658db-dbac-b2cb-b6d2-e9f7caa34d9f-57276ea9" class="parceito-name">Rodrigo Assirati</div>
                                    <div id="w-node-b0a658db-dbac-b2cb-b6d2-e9f7caa34da1-57276ea9" class="parceito-ocupation">Vice-presidente</div>
                                </div>
                                <div class="parceiro-about">Educador e empreendedor, especialista de em educação pela Microsoft e consultor de tecnologia em várias empresas.</div>
                            </div>
                        </div>

                        <div id="w-node-_3943d8d3-ff80-a9d4-cf70-a1cc31a6e884-57276ea9" class="w-layout-grid parceiros-small">

                            <div id="w-node-_42fa211d-a96c-d0f7-8760-622f3c4b8306-57276ea9" class="w-layout-grid parceiro-item">
                                <img src="./../../assets/images/WhatsApp-Image-2021-11-23-at-16.17.24.jpeg" loading="lazy" width="130" id="w-node-d2605ae3-d1e2-0feb-01c8-51af5f8a10b9-57276ea9" srcset="./../../assets/images/WhatsApp-Image-2021-11-23-at-16.17.24-p-500.jpeg 500w, ./../../assets/images/WhatsApp-Image-2021-11-23-at-16.17.24.jpeg 640w" sizes="130px" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-_5d5f637c-15d3-1840-3ab0-5fd8cd7c63c9-57276ea9" class="parceiro-name">Deyse Santana</div>
                                    <div id="w-node-bc897b16-1cd0-373c-fa54-51c8c688b186-57276ea9" class="parceiro-ocupation">Analista Financeira</div>
                                </div>
                            </div>

                            <div id="w-node-b6406038-cdf9-d16d-3b77-6d4706af490b-57276ea9" class="w-layout-grid parceiro-item">
                                <img src={joao_querlon} loading="lazy" width="130" id="w-node-b6406038-cdf9-d16d-3b77-6d4706af490c-57276ea9" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-b6406038-cdf9-d16d-3b77-6d4706af490e-57276ea9" class="parceiro-name">João Querlon</div>
                                    <div id="w-node-b6406038-cdf9-d16d-3b77-6d4706af4910-57276ea9" class="parceiro-ocupation">Conselheiro fiscal</div>
                                </div>
                            </div>

                            <div id="w-node-_0949627d-c617-a778-7308-c77ea6d3f5b2-57276ea9" class="w-layout-grid parceiro-item">
                                <img src={felipe_almeida} loading="lazy" width="130" id="w-node-_0949627d-c617-a778-7308-c77ea6d3f5b3-57276ea9" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-_0949627d-c617-a778-7308-c77ea6d3f5b5-57276ea9" class="parceiro-name">Felipe Almeida</div>
                                    <div id="w-node-_0949627d-c617-a778-7308-c77ea6d3f5b7-57276ea9" class="parceiro-ocupation">Designer</div>
                                </div>
                            </div>

                            <div id="w-node-_6821122a-2971-ab66-8a92-74e5d5782808-57276ea9" class="w-layout-grid parceiro-item">
                                <img src={joaquim_roberto} loading="lazy" width="130" id="w-node-_6821122a-2971-ab66-8a92-74e5d5782809-57276ea9" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-_6821122a-2971-ab66-8a92-74e5d578280b-57276ea9" class="parceiro-name">Joaquim Roberto</div>
                                    <div id="w-node-_6821122a-2971-ab66-8a92-74e5d578280d-57276ea9" class="parceiro-ocupation">Conselheiro</div>
                                </div>
                            </div>

                            <div id="w-node-a226705c-b794-bfb9-7d16-4ced10d7ffec-57276ea9" class="w-layout-grid parceiro-item">
                                <img src={carlos_albertini} loading="lazy" width="130" id="w-node-a226705c-b794-bfb9-7d16-4ced10d7ffed-57276ea9" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-a226705c-b794-bfb9-7d16-4ced10d7ffef-57276ea9" class="parceiro-name">Carlos E. Albertini</div>
                                    <div id="w-node-a226705c-b794-bfb9-7d16-4ced10d7fff1-57276ea9" class="parceiro-ocupation">Psicoterapeuta</div>
                                </div>
                            </div>

                            <div id="w-node-_582850b1-114e-4d7f-7d25-8bdf8f6847a5-57276ea9" class="w-layout-grid parceiro-item">
                                <img src={marcos_brito} loading="lazy" width="130" id="w-node-_582850b1-114e-4d7f-7d25-8bdf8f6847a6-57276ea9" alt="" class="parceiro-avatar"/>
                                <div class="w-layout-grid parceiro-information">
                                    <div id="w-node-_582850b1-114e-4d7f-7d25-8bdf8f6847a8-57276ea9" class="parceiro-name">Marcos Brito</div>
                                    <div id="w-node-_582850b1-114e-4d7f-7d25-8bdf8f6847aa-57276ea9" class="parceiro-ocupation">Gestor de conteúdo</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="w-node-fbcebfc1-e4eb-96cc-6a35-a6469a5b251f-57276ea9" class="w-layout-grid parceiros-content small-parceiros">
                        <img src={Rectangle_69voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_87voluntario} loading="lazy" width="130" id="w-node-_1f44770f-0d3c-20ac-2a39-075c9770d39d-57276ea9" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_40voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_73voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_75voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_74voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_95voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_89voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_76voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_85voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_83voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_67voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_79voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_92voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_86voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                        <img src={Rectangle_72voluntario} loading="lazy" width="130" alt="" class="voluntario-avatar"/>
                    </div>

                </div>
            </section>

            <section id="marcas" class="section conteiner marcas wf-section">
                <div class="w-layout-grid grid-content">
                    <div id="w-node-cd359e40-4b24-c0ed-48be-e89bc565c812-57276ea9" class="header-section">
                        <h2 class="section-title">Estamos conectado com grandes marcas</h2>
                        <div class="section-title ghost">Estamos conectado com grandes marcas</div>
                    </div>
                    <div id="w-node-_813863e6-7edd-c8b5-2822-646f0453c1c9-57276ea9" class="w-layout-grid marcas">
                        <img src={google} loading="lazy" width="153" alt="Google" class="marca"/>
                        <img src={fatec_mogi} loading="lazy" width="109.5" alt="FATEC - Mogi das Cruzes" class="marca"/>
                        <img src={microsoft} loading="lazy" width="153" alt="Microsoft" class="marca"/>
                        <img src={fatec_osasco} loading="lazy" width="109.5" alt="FATEC - Osasco" class="marca"/>
                        <img src={imb} loading="lazy" width="124.5" alt="IMB" class="marca"/>
                        <img src={univesp} loading="lazy" width="153" alt="Univesp" class="marca"/>
                        <img src={usp} loading="lazy" width="123.5" alt="USP" class="marca"/>
                        <img src={esm_usp} loading="lazy" width="68" alt="ESM USP" class="marca"/>
                        <img src={sebrae} loading="lazy" width="93" alt="SEBRAE" class="marca"/>
                    </div>
                </div>
            </section>

            <footer class="footer wf-section">
                <div id="w-node-_07619a71-0f86-ee18-3b5c-a498d8dcfa80-57276ea9" class="w-layout-grid footer-content">

                    <div id="w-node-e4cfa1cc-45fa-3b69-e9db-d7f38348eb54-57276ea9" class="w-layout-grid footer-info">
                        <h2 class="section-title">Fale conosco</h2>
                        <div class="subtitle-section">Nos ajude nessa incrível jornada!</div>
                    </div>

                    <div data-widget-latlng="-23.544613,-46.7113173" data-widget-tooltip="" data-widget-zoom="15" data-widget-style="roadmap" data-enable-scroll="true" data-enable-touch="true" id="w-node-_8553ff87-1584-d996-af64-489d46c3de68-57276ea9" class="map w-widget w-widget-map"></div>

                    <div id="w-node-a951ea87-decf-344d-e173-9c09e15e4b1c-57276ea9" class="w-layout-grid footer-actions">
                        <a id="w-node-a4421ce7-e989-1888-e595-42c747228b80-57276ea9" href="https://docs.google.com/forms/d/e/1FAIpQLSeG9lzGfHVSifOnKUA7CdMQSI_L8o0m-WXm2jucjtVtJXuqWw/viewform" target="_blank" class="primary-button w-button">Quero ser criativo</a>
                        <a id="w-node-fec376c0-1e85-3f6b-81fa-5cb3db61797b-57276ea9" href="https://www.paypal.com/donate/?cmd=_s-xclick&amp;hosted_button_id=EYE7VJQTJKGVE&amp;source=url" target="_blank" class="secondary-button w-button">Faça uma doação</a>
                    </div>

                    <div id="w-node-d7a82cdf-9cdd-a09c-cdf4-fe5975e9a918-57276ea9" class="w-layout-grid footer-whatsapp">
                        <img src={icon_whatsapp} loading="lazy" alt="WhatsApp" class="whatsapp-icon"/>
                        <div id="w-node-e6679919-5ebc-2aa6-2a4e-5cb723c6d18a-57276ea9" class="w-layout-grid whatsapp-info">
                            <div id="w-node-_200a8be7-cd90-637b-0f7c-01cf4910d1e9-57276ea9" class="whats-label">WhatsApp e telefone</div>
                            <a href="https://api.whatsapp.com/send?phone=5511910747492&amp;text=Quero%20falar%20sobre%20o%20Instituto%20Criativo" target="_blank" class="w-inline-block">
                                <div class="whats-number">(11) 91074-7492</div>
                            </a>
                        </div>
                    </div>

                </div>

                <div id="w-node-_164961b8-c449-2cd8-731b-760d6d51f92e-57276ea9" class="w-layout-grid footer-copy">
                    <div>
                        Copyright (c) 2021 <strong>Instituto Criativo</strong>
                    </div>
                    <div>
                        Created and Development with ❤️ by 
                        <a href="https://lipe.design/" target="_blank" class="link">
                            <strong class="lipedesign">Lipe Design</strong>
                        </a>
                    </div>
                </div>

            </footer>

        </div>

        <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60fc6fd742d40922fd276ea8" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>
   
        
        </div>
    )
}

export default Instituto;
