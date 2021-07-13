
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useLazyQuery } from '@apollo/client';

import { loginUserQuery } from '../../queries/query';

const Login = () =>
    {
        const [loginUser, { loading, data }] = useLazyQuery(loginUserQuery);

        const [name, setName] = useState('Name');
        const [email, setEmail] = useState('Email');
        const [password, setPassword] = useState('Password');

        const onNameChange = (event) => { setName(event.target.value); };
        const onEmailChange = (event) => { setEmail(event.target.value); };
        const onPasswordChange = (event) => { setPassword(event.target.value); };

        const successHandler = async (res) =>
        {
            const tokenId = res?.tokenId;

            try { loginUser({ variables: { tokenId } }); }
            catch(err) { console.log(err); };
        };

        const errorHandler = async (err) => { console.log(err); };

        const submitHandler = (event) =>
        {
            event.preventDefault();

            try { loginUser({ variables: { name, email, password } }); }
            catch(err) { console.log(err); };
        };

        localStorage.setItem('token', data?.token);
        console.log(data?.status);

        if (loading) return <p>Loading ...</p>;
        return (
            <form onSubmit={ submitHandler } className="Login">
                <input type='text' className='input' onChange={onNameChange} placeholder={name} />
                <input type='text' className='input' onChange={onEmailChange} placeholder={email} />
                <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
                <button type="submit"> Login </button>

                <GoogleLogin
                    clientId="248809747957-t28kdcifl2ujfhvqlqmhaubscpui2299.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={ successHandler }
                    onFailure={ errorHandler }
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        );
    };

export default Login;