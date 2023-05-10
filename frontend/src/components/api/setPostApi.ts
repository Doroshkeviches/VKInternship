import { url } from "../../constants/url";
import { IUser } from "../../types/types";

export const setPost = (telNumber: number,name: string, avatar: string, content: string, createdAt: string, images: string[], likes: number) => {
    return fetch(url + 'setPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author: {
                telNumber,
                avatar: `${avatar}`,
                name: `${name}`,
            },
            content: `${content}`,
            createdAt: `${createdAt}`,
            images: images,
            likes: likes,
        }),
    });
}