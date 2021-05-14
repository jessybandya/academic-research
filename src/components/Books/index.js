import React, { useState, useEffect } from 'react'
import Posts from './Posts';
import './style.css';
import { db } from './../firebase';
import { auth } from './../firebase';

import { useHistory } from 'react-router-dom';

function Posts1() {
    const history = useHistory("");
    const [posts, setPosts] = useState([]);


    const [user, setUser] = useState([]);
    useEffect(() => {
      auth.onAuthStateChanged((authUser) =>{
        if(authUser){
          setUser(authUser)
        }else{
          setUser(false);
        }
      })
    }, [])
    if(user === false){
        history.push("/login");
    }

    const {currentUser} = auth


    // document.title = 'Facebook';

    

    useEffect(() => {
        db.collection('books').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);

    console.log(posts)

    
    return (
        <div className="posts">
            {
                posts.map(({ id, post }) => (
                    < Posts key={id} field={post.field} book={post.book} timestamp={post.timestamp} />
                ))
            }
        </div>
    )
}

export default Posts1