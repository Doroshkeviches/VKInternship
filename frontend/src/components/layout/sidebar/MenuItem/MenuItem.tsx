import './style.sass'
import { menu } from './menu';
import { Link } from 'react-router-dom';
const MenuItem = () => {
    return (
        <>

            {menu.map(item => {
                return (
                    <>
                        <Link to={item.link}>
                            <div className='menu-item-container'>
                                <item.icon style={{ color: "#447BBA" }} />
                                <div className='menu-item-container-text'>{item.title}</div>
                            </div>
                        </Link>
                    </>
                )
            })}
        </>
    );
};

export default MenuItem;