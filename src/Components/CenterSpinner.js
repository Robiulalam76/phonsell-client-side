import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const CenterSpinner = () => {
    return (
        <div className='flex justify-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#0129A4, #0129A4']}></ColorRing>
        </div>

    );
};

export default CenterSpinner;