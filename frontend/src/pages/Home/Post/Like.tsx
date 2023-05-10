import React, { useState } from 'react';
import { icons } from '../../../constants/icons';
interface Likes {
    likes: number
}
const Like = ({ likes }: Likes) => {
    const [like, setLike] = useState(likes)
    const [isLiked, setIsLiked] = useState(false)
    const increaseLike = () => {
        setLike(like => like + 1)
        setIsLiked(true)
    }
    const decreaseLike = () => {
        setLike(like => like - 1)
        setIsLiked(false)
    }
    return (
        <div className='post-container-likes' onClick={() => {
            isLiked ? decreaseLike() : increaseLike()
        }}>
            <icons.like style={{ fill: '#818c99', width: '16px' }} />
            {like}
        </div>
    );
};

export default Like;