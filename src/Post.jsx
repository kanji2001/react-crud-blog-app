import React, { useState, useEffect} from 'react';
import { deletePost, getPost } from './Components/Api/PostApi';
import Form from './Components/Form';

const Post = () => {

    const [data, setData] = useState([])
    const [UpdatePost, setUpdatePost] = useState({})

    const getPostData = async () => {
        const res = await getPost()
        console.log(res)
        setData(res.data)
      }
    
      useEffect(() => {
        getPostData();
      }, [])
    
    const handleDeletePost = async (id) => {
      try {
        const res = await deletePost(id);
          if(res.status === 200) {
            const newUpdatedPost = data.filter((curPost) =>  curPost.id !== id);
            setData(newUpdatedPost);
          } else {
            console.log("failed to delete the post", res.status)
          }
      }
        catch (error) {
          console.log(error)
        }
    }

    const handleUpdatePost = (curElem) => setUpdatePost(curElem);

  return (
    <>
    <section className='section-form'>
      <Form data = {data} setData = {setData} UpdatePost={UpdatePost} setUpdatePost= {setUpdatePost} />
    </section>
        <section className='section-post'>
            <ol>
                {data.map((curElem) => {
                    const {id, body, title} = curElem;
                    return <li key={id}>
                        <p>{title}</p>
                        <p>{body}</p>
                        <button onClick={() =>handleUpdatePost(curElem)} >Edit</button>
                        <button className='btn-delete' onClick={() => handleDeletePost(id)} >Delete</button>
                    </li>
                })}
            </ol>
        </section>
    </>
  )
}

export default Post



