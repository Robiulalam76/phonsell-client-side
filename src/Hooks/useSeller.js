import { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://phonsell-server.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsSeller(data.isSeller)
                    setIsLoading(false)
                })
        }
    }, [email])
    return [isSeller, isLoading]
};

export default useSeller;