import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        /* console.log(result) */
        setData(result.posts)
      })
  }, [])

  const likePost = (id) => {
    fetch('/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        /* console.log(result) */
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        /* console.log(result) */
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="home">
      {data.map(item => {
        /* console.log("Item ID:", item._id); */
        const isLiked = item.likes.includes(state._id);
  
        const toggleFavorite = postId => {
          // Implemente a lógica para atualizar o estado de favorito do post
          // com base no ID do post (postId)
          console.log("Toggle Favorite for Post ID:", postId);
        };
  
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ fontWeight: "bold" }}>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="Post" />
            </div>
            <div className="card-content">
              {isLiked ? (
                <i className="material-icons icone icone1 animate__animated animate__bounce">favorite</i>
              ) : (
                <i className="material-icons icone">{/* favorite */}</i>
              )}
              {isLiked ? (
                <i
                  className="material-icons icone"
                  onClick={() => {
                    unlikePost(item._id);
                    toggleFavorite(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons icone"
                  onClick={() => {
                    likePost(item._id);
                    toggleFavorite(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} Curtidas</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record => {
                  return (
                    <h6 key={record._id}><span style={{ fontWeight: "bold" }}>{record.postedBy.name}</span> {record.text}</h6>
                  )
                })
              }
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target[0].value);
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="Adicione um comentário" />
                {/* <button type="submit">Adicionar</button> */}
              </form>
            </div>
          </div>
        );
      })}
    </div>
  )
}
export default Home;