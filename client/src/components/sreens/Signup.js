import React, { useState } from 'react'
import * as M from 'materialize-css'
import { Link, useHistory } from 'react-router-dom'
import 'animate.css'
import Camera from "../../img/camera.png";

const Signup = () => {
  const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const history = useHistory();
  setTimeout(() => { M.updateTextFields() }, 0);

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const PostData = () => {
    if (!emailValidator.test(email)) {
      M.toast({ html: "Email foi preenchido no formato incorreto <br> ou todos os campos estão vazios :(", classes: "#c62828 red darken-3" })
      return
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 orange darken-3" })
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" })
          history.push('/signin')
        }
      }).catch(err => {
        console.log(err);
      })
  }//animate__animated animate__flip

  return (
    <div className="mycard">{/* animate__animated animate__flip */}
      <div className="card auth-card input-field col s12">
        <img className="ImgLogo" src={Camera} />
        <h2>RivaSocial</h2>
        <div className="input-field col s12">
          <input
            id="last_name"
            type="text"
            className="validate"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="last_name" className="label">Nome</label>
        </div>
        <div className="input-field col s12">
          <input
            id="email"
            type="email"
            className="validate"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label">E-mail</label>
        </div>
        <div className="input-field col s12">
          <input
            id="password"
            type="password"
            className="validate"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">Senha</label>
        </div><br />
        <button className="btn waves-effect waves-light blue darke-1"
          onClick={() => PostData()}>Criar Conta</button>
        <h6>
          <Link to="/signin">Criar uma conta?</Link>
        </h6>
      </div>
    </div>
  );
}
export default Signup;