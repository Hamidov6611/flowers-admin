import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function PrivateRouter({ children }) {
    const navigate = useNavigate()

    const auth = localStorage.getItem("token")

    useEffect(() => {
        if (!auth) {
            return navigate("/")
        }
    }, [auth, navigate, children])

    return children
}

export default PrivateRouter;