import SumsubWebSdk from '@sumsub/websdk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Verify = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/generate-token').then(res => {
            console.log(res.data);
            setAccessToken(res.data.token);
        }).catch(err => {
            console.error('Error generating token:', err);
        });
    }, []);

    const accessTokenExpirationHandler = () => {
        console.log('Access token expired');
    };

    const config = {
        lang: 'en',
        uiConf: {
            customCssStr: `
                html, body, #sumsub-websdk-container {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                }
                iframe {
                    border: none;
                    width: 100vw;
                    height: 100vh;
                }
            `
        }
    };



    const messageHandler = (action,payload) => {
        if(action==='idCheck.onApplicantStatusChanged' && payload.reviewStatus==='completed'){
            if(payload?.reviewResult?.reviewAnswer==='GREEN') {
                console.log('Check kyc verification status from backend api and nagivate to desired route');

            }
            else if(payload?.reviewResult?.reviewAnswer==='RED') {
                console.log('verification failed . reload the verification process');
            }
        }
    };

 
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {
                accessToken ? (
                    <SumsubWebSdk
                        accessToken={accessToken}
                        expirationHandler={accessTokenExpirationHandler}
                        config={config}
                        onMessage={messageHandler}
                    />
                ) : (
                    <div className='h-screen w-screen flex justify-center items-center'>
                        <p>Loading...</p>
                    </div>
                )
            }
        </div>
    );
};

export default Verify;
