
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useMutation } from '@apollo/client';

import { createUserMutation } from '../../queries/query';

const SignUp = () =>
    {
        const [createUser, { data }] = useMutation(createUserMutation);

        const [name, setName] = useState('Name');
        const [email, setEmail] = useState('Email');
        const [password, setPassword] = useState('Password');

        const onNameChange = (event) => { setName(event.target.value); };
        const onEmailChange = (event) => { setEmail(event.target.value); };
        const onPasswordChange = (event) => { setPassword(event.target.value); };

        const successHandler = async (res) =>
        {
            const tokenId = res?.tokenId;

            try { createUser({ variables: { tokenId } }); }
            catch(err) { console.log(err); };
        };
        
        const errorHandler = async (err) => { console.log(err); };

        const submitHandler = (event) =>
        {
            event.preventDefault();

            try { createUser({ variables: { name, email, password } }); }
            catch(err) { console.log(err); };
        };

        localStorage.setItem('token', data?.token);
        console.log(data?.status);

        return (
            <form onSubmit={ submitHandler } className="SignUp">
                <input type='text' className='input' onChange={onNameChange} placeholder={name} />
                <input type='text' className='input' onChange={onEmailChange} placeholder={email} />
                <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
                <button type="submit">SignUp</button>

                <GoogleLogin
                    clientId="248809747957-t28kdcifl2ujfhvqlqmhaubscpui2299.apps.googleusercontent.com"
                    buttonText="SignUp"
                    onSuccess={ successHandler }
                    onFailure={ errorHandler }
                    cookiePolicy={'single_host_origin'}
                />
            </form>
        );
    };

export default SignUp;