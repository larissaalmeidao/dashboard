import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Sobre from "../../pages/sobre/Sobre";
import ListaEventos from "../../pages/lista/ListaEventos";
import Instituto from "../../pages/instituto/Instituto";
import Login from "../../pages/login/Login";
import CadastroUser from "../../pages/usuario/CadastroUser";
import Publicacoes from "../../pages/publicacao/Publicacao";


function Rotas() {
    return(
        <div>
            
            <Router> {/* ROUTER responsável por gerenciar a navegação entre as diferentes rotas da aplicação. Ele deve envolver todos os componentes relacionados à navegação, como as rotas e os links. */}
               
                    <Routes> {/** define todas as rotas */}
                        {/**Rotas */}
                        <Route path="/" element={<Instituto />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/usuario" element={<CadastroUser />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/lista" element={<ListaEventos/>}/>
                        <Route path="/publi" element={<Publicacoes/>}/>
                        
                    </Routes>
                

            </Router>
        </div>
    )
}

export default Rotas;
