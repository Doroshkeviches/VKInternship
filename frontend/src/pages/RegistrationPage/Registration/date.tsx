import { month } from '../../../constants/date/month';
interface Date {
    name: string,
    id: number
}
export const  yearsArray = () => {
    const years = []
    for(let i = 2023 ; i > 1900 ; i--){
        years.push(<option key={i} value={i}>{i}</option>)
    }
    return years
}
export const  monthArray = () => {
    return month.map((item: Date) => {
        return <option key={item.id} value={item.name}>{item.name}</option>
    })
}
export const  daysArray = () => {
    const days = []
    for(let i = 31 ; i >= 1 ; i--){
        days.push(<option key={i} value={i}>{i}</option>)
    }
    return days
}