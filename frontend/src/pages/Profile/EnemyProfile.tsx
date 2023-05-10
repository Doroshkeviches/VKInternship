import { useEffect, useState } from "react";
import { url } from "../../constants/url";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import useAuth from "../../components/auth/userAuth";
interface Props {
    name: string,
    lastName: string,
}
const EnemyProfile = ({ name, lastName }: Props) => {
    const user = useAuth()
    useEffect(() => {
        if (!user.name) {
            history('/auth')
        }
    }, [user])
    const history = useNavigate()
    function setFrinedList(str: string) {
        fetch(url + 'setFrinedList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": user.name,
                "friend": str

            }),
        })
            .then((res) => res.json())
            .then((data) => {
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
                
            });
    }


    return (
        <div>
            <img src={user.avatar} alt="" />
            <div>
                Имя : {name}<br />
                Фамилия : {lastName}
            </div>
            <div>
                <button onClick={() => {
                    console.log(name)
                    setFrinedList(name)
                    }}>Add friend</button>
                    <button onClick={() => removeFrined(user?.name!, name)}>Delete</button>
            </div>
        </div>
    )
};

export default EnemyProfile;