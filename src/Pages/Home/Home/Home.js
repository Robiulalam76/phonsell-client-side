import React from 'react';
import SimpleSlider from '../Banner/Banner';
import Categories from '../Categories/Categories';
import UsedPhoneInstruction from '../UsedPhoneInstruction/UsedPhoneInstruction';

const Home = () => {
    return (
        <div className="">
            <SimpleSlider></SimpleSlider>
            <Categories></Categories>
            <UsedPhoneInstruction></UsedPhoneInstruction>
        </div>
    );
};

export default Home;