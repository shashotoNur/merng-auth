import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { getProfileQuery, updatePasswordMutation, deleteUserMutation } from '../../schema/';

const Profile = ({ client }) =>
  {
    const { loading, error, data: profileData } = useQuery(getProfileQuery);
    const [deleteUser, { data: deletedUserData }] = useMutation(deleteUserMutation);
    const [updatePassword, { data: updatedPasswordData }] = useMutation(updatePasswordMutation);
    const [password, setPassword] = useState('New Password');

    const onPasswordChange = (event) => { setPassword(event.target.value); };

    const updatePasswordFn = (event) =>
    {
        event.preventDefault();

        try { updatePassword({ variables: { password } }); }
        catch(err) { console.log(err); };
    };

    const deleteAccount = () =>
    {
      try
      {
        deleteUser();
        if(deletedUserData?.status === 'User deleted successfully!') logout();
        else alert(deletedUserData?.status);
      }
      catch(err) { console.log(err); };
    };

    const logout = () =>
    {
      localStorage.removeItem("token");
      client.resetStore();
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
      <div className="profile">
        <h3>Welcome, { profileData.name }</h3>
        <p>{ profileData.status }</p>

        <p>{ updatedPasswordData?.status }</p>
        <form onSubmit={ updatePasswordFn }>
          <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
          <button type="submit"> Update Password </button>
        </form>

        <input type='button' value='Delete Account' onClick={deleteAccount} className='button' />
        <input onClick={ logout } value='Logout' />
      </div>
    );
  };

export default Profile;