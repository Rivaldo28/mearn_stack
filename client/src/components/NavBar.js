/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import Camera from "../img/camera.png";
import M from 'materialize-css';

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    // Inicialize o componente Sidenav do Materialize CSS
    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push('/signin');
  };

  const handleItemClick = () => {
    const sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    if (sidenavInstance) {
      sidenavInstance.close();
    }
  };

  const renderList = () => {
    if (state) {
      return [
        <li key="profile" className="lista"><Link to="/profile" className="textLink" onClick={handleItemClick}><i className="material-icons icone">account_box</i>Perfil</Link></li>,
        <li key="create" className="lista"><Link to="/create" className="textLink modal-trigger" data-target="modal1" onClick={handleItemClick}><i className="material-icons icone">add_circle_outline</i> Criar Post</Link></li>,
        <li key="logout" className="lista">
          <button className="btn #c62828 red darken-3" style={{marginLeft:"10%"}} onClick={handleLogout}>
            Sair
          </button>
        </li>
      ];
    } else {
      return [
        <li key="signin"><Link to="/signin" className="textLink" onClick={handleItemClick}><i className="material-icons icone">input</i>Entrar</Link></li>,
        <li key="signup"><Link to="/signup" className="textLink" onClick={handleItemClick}><i className="material-icons icone">person_add</i>Cadastra-se</Link></li>
      ];
    }
  };

  return (
    <header>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "signin"} className="brand-logo left animate__shakeX">
            <img className="ImgLogo animate__animated animate__bounceIn infinite" src={Camera} />
            <h1 className="LogoName">RivaSocial</h1>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
          <a href="#" data-target="mobile-menu" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-menu">
        {renderList()}
      </ul>
    </header>
  );
};

export default NavBar;