import { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState('')
    // console.log(email);
    useEffect(() => {
        if (email) {
            fetch(`https://phonsell-server.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.accessToken) {
                        localStorage.setItem('access-token', data.accessToken)
                        setToken(data.accessToken)
                    }
                })
        }
    }, [email])
    return [token];
};

export default useToken;