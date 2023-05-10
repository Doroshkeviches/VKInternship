import { url } from "../../constants/url";
interface Date {
    year: string,
    month: string,
    day: string
}
export const getPosts = () => {
     return fetch(url + 'getPosts')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
}