import React from 'react';
import phone from '../../../assests/images/phone1.jpg'

const UsedPhoneInstruction = () => {
    return (
        <section className='grid lg:grid-cols-2 gap-6 px-8 my-12 mx-auto'>
            <div>
                <img src={phone} alt="" />
            </div>
            <div>
                <h1 className='dark:text-white text-gray-900 font-bold text-xl mt-4'>Why use old mobile phones?</h1>
                <hr />
                <p className='dark:text-gray-300 mt-3'>
                    That opens up plenty of interesting possibilities: You could use your old device as a ready-to-go backup phone in case your regular one is ever missing, broken, or low on battery; you could use it as a dedicated hotspot to beam out mobile data access without draining your primary phone's battery; or you could use it as an always-connected on-the-go slate for your kids (hello, airport video-streaming) without having to pay for an extra line of service.
                </p>
            </div>
        </section>
    );
};

export default UsedPhoneInstruction;