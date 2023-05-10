import './style.sass'
import { Logo } from '../../../assets/images';
const Header = () => {
    return (
        <header >
            <div className='header-logo-container'>
                <img className='header-logo' src={Logo} alt="" />
                <div className='header-vktext'>вконтакте</div>
            </div>
            <div className='header-profile'>
                <img className='header-profile-image' src={Logo} alt="" />
            </div>
        </header>
    );
};

export default Header;