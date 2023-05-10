import React, { useEffect, useState } from 'react';
import useAuth from '../../components/auth/userAuth';
import { IPost } from '../../types/types';
import { useAppDispatch } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { url } from '../../constants/url';
import AddPost from '../Home/AddPost';
import Post from '../Home/Post';


const Profile = () => {
    const user = useAuth()
    useEffect(() => {
        if (!user.name) {
            history('/auth')
        }
    }, [user])
    console.log(user)

    const [posts, setPosts] = useState<IPost[]>([])
    const history = useNavigate()

    const getOunPosts = (username: string) => {
        fetch(url + 'getOunPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
            });
    }
    useEffect(() => {
        if (user) {
            getOunPosts(user?.name!)
        }
    }, [user])

    return (
        <div>
            <img src={user.avatar} alt="" />
            <div>
                Имя : {user.name}<br />
                Фамилия : {user.lastName}
            </div>
            <div>
                <AddPost setPosts={setPosts} />
                <Post posts={posts} />
                {/* Дата рождения : {user.selectedDate ? user.selectedDate.day / user.selectedDate.month / user.selectedDate.year : null} */}
            </div>
        </div>
    );
};

export default Profile;