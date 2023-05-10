import { url } from "../../constants/url";
import { IUser } from "../../types/types";

export const sendMessageApi = (user: IUser, context: string) => {
    const today = new Date();
    const now = today.toLocaleString();
    fetch(url + 'setMessages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            context,
            createdAt: now,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
}