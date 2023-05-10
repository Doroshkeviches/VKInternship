import { useSelector } from "react-redux";
import { userAuthRedux } from "../../redux/toolkitReducer";


const useAuth = () => {
    const userAuth = useSelector(userAuthRedux)
    return userAuth
};

export default useAuth;