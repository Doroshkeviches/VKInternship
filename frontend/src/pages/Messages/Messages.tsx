import React from 'react';
import './style.sass'
interface Props {
    title: String,
    
}
const Messages = ({title}: Props) => {
    return (
        <div  className='message-container'>
            {title}
        </div>
    );
};

export default Messages;