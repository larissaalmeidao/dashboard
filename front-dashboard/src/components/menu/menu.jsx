import menufoto from './../../assets/img/menu-svgrepo-com.png';
import './menu.css'

function Menu({ onAbrirSidebar }) {
  return (
    <button id="abrirSidebar" className="menu-button" onClick={onAbrirSidebar}>
      <span className="menu-icon">
        <img src={menufoto} alt="menu" className="menu"/>
      </span>
    </button>
  )
}

export default Menu