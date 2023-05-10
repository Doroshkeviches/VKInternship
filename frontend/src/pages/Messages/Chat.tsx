import './style.sass'
import Messages from "./Messages";
import { useCallback, useEffect, useRef, useState } from 'react';
import useAuth from '../../components/auth/userAuth';
import { useNavigate } from 'react-router-dom';
import { sendMessageApi } from '../../components/api/setMessage';
import { url } from '../../constants/url';

const Chat = () => {
    const user = useAuth()
    const [messages, setMessages] = useState<any[]>([]);
    const [value, setValue] = useState<string>();
    const socket = useRef<any>()
    const [connected, setConnected] = useState(false);
    const history = useNavigate()

    useEffect(() => {
        if (!user.name) {
            history('/auth')
        }
    }, [user])
    useEffect(() => {
        connect()
        getDialogue()
    }, [])

    function connect() {
        socket.current = new WebSocket('ws://localhost:2000')
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username: user.name,
                id: Date.now()
            }
            if (socket.current.readyState) {
                socket.current.send(JSON.stringify(message))
            }
        }
        socket.current.onmessage = (event: { data: string; }) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [...prev, message])

        }
        socket.current.onclose = () => {
            console.log('Socet Closed')

        }
        socket.current.onerror = () => {
            console.log('secet Error')

        }

    }
    const getDialogue = () => {
        return fetch(url + 'getDialogue')
            .then((res) => res.json())
            .then((data) => {
                data.map((mess: any) => {
                    setMessages(prev => [...prev, {
                        username: mess.username,
                        message: mess.context,
                        id: mess._id,
                        event: 'message',
                        time: mess.createdAt
                    }])
                })
            });
    }

    const sendMessage = async () => {
        const today = new Date();
        const now = today.toLocaleString();
        const message = {
            username: user.name,
            message: value,
            id: Date.now(),
            event: 'message',
            time: now
        }
        socket.current.send(JSON.stringify(message));
        sendMessageApi(user?.name!, value!)
        setValue('')
    }
    if (!connected) {
        return (
            <>
                <input type="text" value={user.name!} />
                <button onClick={connect}>Войти в чаты</button>
            </>
        )
    }


    return (
        <div className='chat-container'>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button
                onClick={() => {
                    sendMessage()
                }}
            >Send</button>
            {messages?.map(mess => {
                if (mess.message) {
                    console.log(mess)
                    return (
                        mess.username == user.name
                            ?
                            <div>
                                <div className='author-message-name'>
                                    {mess.username},{mess.time}
                                </div>
                                <div className='my-message message-container '>
                                    {mess.message}
                                </div>
                            </div>

                            :
                            <div>
                                <div className='author-message-name'>
                                    {mess.username},{mess.time}
                                </div>
                                <div className='enemy-message message-container '>
                                    {mess.message}
                                </div>
                            </div>
                    )
                }
            })}
        </div>
    );

};

export default Chat;