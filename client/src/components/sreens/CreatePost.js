import React, { useState, useEffect } from "react";
import * as M from 'materialize-css';
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" })
          } else {
            M.toast({ html: "Criado a Postagem com sucesso!", classes: "#43a047 green darken-1" })
            history.push('/')
          }
        }).catch(err => {
          console.log(err);
        })
    }
  }, [url])

  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "dltdpep6k")
    fetch("https://api.cloudinary.com/v1_1/dltdpep6k/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="card input-filed"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
        position: "relative",
      }}>
      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Corpo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn blue darke-1">
          <span>Arquivo</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper ">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light blue darke-1"
        onClick={() => postDetails()}>
        Enviar post</button>
    </div>
  )
}

export default CreatePost;