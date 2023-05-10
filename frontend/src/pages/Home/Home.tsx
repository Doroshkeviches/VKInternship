import { useEffect, useState } from "react";
import MenuItem from "../../components/layout/sidebar/MenuItem";
import AddPost from "./AddPost";
import { IPost } from "../../types/types";
import Post from "./Post/Post";
import { setNameRedux } from "../../redux/toolkitReducer";
import { useAppDispatch } from "../../redux";
import { useNavigate } from "react-router-dom";
import { url } from "../../constants/url";
import useAuth from "../../components/auth/userAuth";

const Home = () => {


    const user = useAuth()
    const [posts, setPosts] = useState<IPost[]>([])
    const dispatch = useAppDispatch()
    const history = useNavigate()

    const getPosts = () => {
        return fetch(url + 'getPosts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
            });
    }
    useEffect(() => {
        getPosts()
    }, [])
    useEffect(() => {
        if (!user.name) { 
            history('/auth')
         }
    }, [user])

    return (
        <div>
            <AddPost setPosts={setPosts} />
            <Post posts={posts} />
            <button onClick={() => {
                history('/auth')
                dispatch(setNameRedux({
                    name: null,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuqj4Wm1BlDTS_zP4EvGRCgZd1mqNthtT-Q&usqp=CAU'
                }))
            }}>Выйти</button>
        </div>
    );
};

export default Home;