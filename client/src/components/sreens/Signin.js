import React, { useState, useContext } from "react";
import * as M from 'materialize-css';
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import 'animate.css';
import Camera from "../../img/camera.png";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const PostData = () => {
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.error) {
        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        M.toast({ html: "Logado com sucesso!", classes: "#43a047 green darken-1" });
        history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  return (
    <div className="mycard">{/* animate__animated animate__flip */}
      <div className="card auth-card input-field col s12">
        <img className="ImgLogo" src={Camera} alt="Logo" />
        <h2>RivaSocial</h2>
        <div className="input-field col s12">
          <input
            id="email"
            type="text"
            className="validate"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label"><i className="material-icons icone">email</i>E-mail</label>
        </div>
        <div className="input-field col s12">
          <input
            id="password"
            type="password"
            className="validate"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label"><i className="material-icons icone">lock</i>Senha</label>
        </div><br />
        <button className="btn waves-effect waves-light blue darken-1" onClick={() => PostData()}>Iniciar Sessão</button>
        <h6>
          <Link to="/signup">Criar uma conta?</Link>
        </h6>
      </div>
    </div>
  );
}

export default Signin;