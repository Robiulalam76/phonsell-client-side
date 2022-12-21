import React, { useEffect, useState } from 'react';

const useUser = (email) => {
    const [isUser, setIsUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    // console.log(isUser);
    useEffect(() => {
        if (email) {
            fetch(`https://phonsell-server.vercel.app/users/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsUser(data.isUser)
                    setIsLoading(false)
                })
        }
    }, [email])
    // console.log(isUser);
    return [isUser, isLoading]
};

export default useUser;