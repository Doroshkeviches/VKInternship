import { url } from "../../constants/url";
import EnemyProfile from "../../pages/Profile/EnemyProfile";

export function getUser(username: string) {
    fetch(url + 'getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username

        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            
        });
}