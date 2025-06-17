
import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate= useNavigate
    ();
    return (
        <div className='h-screen w-screen flex justify-center items-center'>

            <button onClick={()=>navigate('/verify-kyc')}>VERIFY KYC</button>
            
        </div>
    );
};

export default Home;