import {createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const checkAuth = () => {
        try {
            const token = localStorage.getItem("Hotel-Auth-Token");
            if (token) {

            } else {
                setAuth(false);
            }
        } catch (error) {

        }
    }


    if (auth === null) {
    } else {
        if (auth === false) {
            navigate("/login");
        }
    }



    return (
        <AuthContext.Provider value={{

        }}>
            {children}
        </AuthContext.Provider>
    )
}
