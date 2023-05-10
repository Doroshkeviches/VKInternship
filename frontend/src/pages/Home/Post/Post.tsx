import { IPost } from '../../../types/types';
import { icons } from '../../../constants/icons';
import './style.sass'
import Like from './Like';
import EnemyProfile from '../../Profile/EnemyProfile';
import { url } from '../../../constants/url';
import { useState } from 'react';
interface IPosts {
    posts: IPost[]
}
const Post = ({ posts }: IPosts) => {
    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')

    function getUser(username: string) {
        fetch(url + 'getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username
    
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setName(data.name)
                setLastName(data.lastName)
            });
    }
    console.log(posts)
if(name && lastName) {
    return (<EnemyProfile name={name} lastName={lastName}/>)

}
    return (
        <>
            {posts.map((post) => {
                return (
                    <div  className='post-container' key={post.createdAt}>
                        <div onClick={() => {
                        console.log(post.author.name),
                        getUser(post.author.name)
                        }}  className='post-container-header'>
                            {post.author.avatar ? <img className='post-container-header-avatar' src={post.author.avatar} alt="avatar" /> : null}
                            <div className='post-container-header-subtitle'>
                                <div className='post-container-header-subtitle-name'>{post.author.name}</div>
                                <div className='post-container-header-subtitle-time'>{post.createdAt.toString()}</div>
                            </div>
                        </div>
                        <div className='post-container-main'>
                            <div className="post-container-main-images">
                                {post.images ? post.images.map((image => {
                                    return <img className="post-container-main-images-item" src={image} alt="post-image" />
                                }))
                                    : null}
                            </div>
                            <div className="post-container-main-text">
                                {post.content}
                            </div>
                        </div>
                        <Like likes={post.likes} />
                    </div>
                )
            })}

        </>
    );
};

export default Post;