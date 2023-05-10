import React, { useEffect, useState } from 'react';
import { url } from '../../constants/url';
import useAuth from '../../components/auth/userAuth';
import { useNavigate } from 'react-router-dom';

const FriendsList = () => {
    const [friends, setFriends] = useState<any[]>([])
    const user = useAuth()
    const getFriends = (username: string) => {
        fetch(url + 'getOunFriends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setFriends(data)
            });

    }
    function removeFrined(username: string, friend: string) {
        fetch(url + 'removeFrined', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 username: username,
                 friend: friend 
                }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFriends(friends => friends.filter((item) => item !== friend))
            });
    }
    const history = useNavigate()
    useEffect(() => {
        if (!user.name) {
            history('/auth')
        }
    }, [user])
    useEffect(() => {
        getFriends(user?.name!)
    }, [])
    return (
        <div className='friendlist'>
            {friends.map(fr => {
                return (<div>
                    <div>
                    {fr}
                    </div>
                    <button onClick={() => removeFrined(user?.name!, fr)}>Удалить из друзей</button>
                </div>
                )
            })}
        </div>
    );
};

export default FriendsList;