import { url } from "../../constants/url";

export const getDialogue = () => {
    return fetch(url + 'getDialogue')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
}