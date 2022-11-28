import React, { useEffect, useState } from 'react';

const useUser = (email) => {
    const [isUser, setIsUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    console.log(isUser);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsUser(data.isUser)
                    setIsLoading(false)
                })
        }
    }, [email])
    console.log(isUser);
    return [isUser, isLoading]
};

export default useUser;