import { useEffect, useState } from 'react';
import axios from 'axios'

const useToken = (email) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:5000/jwt?email=${email}`)
                .then(data => {
                    // console.log(data.data.accessToken);
                    if (data.data.accessToken) {
                        localStorage.setItem('access-token', data.data.accessToken)
                        setToken(data.data.accessToken)
                    }
                })
        }
    }, [email])
    return [token];
};

export default useToken;