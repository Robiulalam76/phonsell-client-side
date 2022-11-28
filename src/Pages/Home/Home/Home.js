import React from 'react';
import AdvertiseProducts from '../AdvertiseProducts/AdvertiseProducts';
import SimpleSlider from '../Banner/Banner';
import Categories from '../Categories/Categories';
import UsedPhoneInstruction from '../UsedPhoneInstruction/UsedPhoneInstruction';

const Home = () => {
    return (
        <div className="w-full mx-auto">
            <SimpleSlider></SimpleSlider>
            <Categories></Categories>
            <AdvertiseProducts></AdvertiseProducts>
            <UsedPhoneInstruction></UsedPhoneInstruction>
        </div>
    );
};

export default Home;