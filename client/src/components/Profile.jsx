import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const user1 = useSelector((state) => state.auth);

  console.log(user1)
  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
