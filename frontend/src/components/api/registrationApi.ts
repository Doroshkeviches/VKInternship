import { url } from "../../constants/url";
interface Date {
    year: string,
    month: string,
    day: string
}
export const registration = (telNumber: string, password: string, name: string, lastName: string, date: Date) => {
    fetch(url + 'registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            telNumber: `${telNumber}`,
            password: `${password}`,
            name: `${name}`,
            lastName: `${lastName}`,
            date: date,

        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.message === 'The user has been successfully registered') {

            }
        });
}
