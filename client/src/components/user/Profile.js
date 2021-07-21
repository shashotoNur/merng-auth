import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { getProfileQuery, updatePasswordMutation, deleteUserMutation } from '../../queries/profileQueries';

const Profile = () =>
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
        else console.log(deletedUserData?.status);
      }
      catch(err) { console.log(err); };
    };

    const logout = () => { localStorage.removeItem("token"); }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
      <div className="profile">
        <h3>Welcome, { profileData.getProfileQuery.name }</h3>
        <p>{ profileData.getProfileQuery.status }</p>

        <p>{ updatedPasswordData?.status }</p>
        <form onSubmit={ updatePasswordFn }>
          <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
          <button type="submit"> Update Password </button>
        </form>

        <input type='button' defaultValue='Delete Account' onClick={deleteAccount} className='button' />
        <input type='button' defaultValue='Logout' onClick={ logout } />
      </div>
    );
  };

export default Profile;