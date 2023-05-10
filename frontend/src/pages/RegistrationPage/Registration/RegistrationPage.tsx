import './style.sass'
import { yearsArray, monthArray, daysArray } from './date';
import { useEffect, useState } from 'react';
import { registration } from '../../../components/api/registrationApi';
import { useAppDispatch } from '../../../redux';
import { setNameRedux, userAuthRedux } from '../../../redux/toolkitReducer';
import { useSelector } from 'react-redux';
import useAuth from '../../../components/auth/userAuth';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../constants/url';

interface Date {
    year: string,
    month: string,
    day: string
}

const RegistrationContainer = () => {
    const [login, setLogin] = useState(false)
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>()
    const [telNumber, setTelNumber] = useState<string>()
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const [selectedDate, setSelectedDate] = useState<Date>({} as Date);

    const user = useAuth() //Хук редакса
    console.log('user',user)

   
    const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        const value = event.target.value;
        setSelectedDate({
            ...selectedDate,
            year: value
        });
    };
    const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        const value = event.target.value;
        setSelectedDate({
            ...selectedDate,
            month: value
        });
    };
    const selectChangeDay = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        const value = event.target.value;
        setSelectedDate({
            ...selectedDate,
            day: value
        });
    };
    const history = useNavigate()
    useEffect(() => {
        if (user.name) { 
            history('/')
         }
    }, [user])
    function loginApi(username: string, password: string) {
        fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password
    
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            });
    }
    if(login) {
        return(
            <div>
                <input className='registration-container-name' type="text" placeholder='Ваше имя' value={name} onChange={(e) => setName(e.target.value)} required={true} />
                <input className='registration-container-password' type="text" placeholder='ASD123qwe' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                <button onClick={() => loginApi(name,password)}>Войти</button>
                <button onClick={() => setLogin(false)}>Регистрация</button>

            </div>

        )
    }
    return (
        <div className="registration-container">
            <div className="registration-container-header header-big-text">Впервые ВКонтакте?</div>
            <div className="registration-container-header header-small-text">Моментальная регистрация</div>
            <input className='registration-container-telnumber' type="number" placeholder='123123123' value={telNumber} onChange={(e) => setTelNumber(e.target.value)} required={true} />
            <input className='registration-container-password' type="text" placeholder='ASD123qwe' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
            <input className='registration-container-name' type="text" placeholder='Ваше имя' value={name} onChange={(e) => setName(e.target.value)} required={true} />
            <input className='registration-container-lastName' type="text" placeholder='Ваша фамилия' value={lastName} onChange={(e) => setLastName(e.target.value)} required={true} />
            <div className='registration-container-date-text'>Дата рождения</div>
            <div className='registration-container-select'>
                <select className='registration-container-year' onChange={selectChangeYear} value={selectedDate.year}>
                    <option>Выберите год</option>
                    {yearsArray()}
                </select>
                <select className='registration-container-month' onChange={selectChangeMonth} value={selectedDate.month}>
                    <option>Выберите месяц</option>
                    {monthArray()}
                </select>
                <select className='registration-container-day' onChange={selectChangeDay} value={selectedDate.day}>
                    <option>Выберите день</option>
                    {daysArray()}
                </select>
            </div>
            <button className="registration-button" onClick={() => {
                dispatch(setNameRedux({
                    name,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuqj4Wm1BlDTS_zP4EvGRCgZd1mqNthtT-Q&usqp=CAU',
                    telNumber,
                    password,
                    lastName,
                    selectedDate
                }))
                registration(telNumber!, password!, name!, lastName!, selectedDate)
            }
            }>
                Зарегистрироваться
            </button>
            <button onClick={() => setLogin(true)}>Войти</button>

        </div>
    );
};

export default RegistrationContainer;