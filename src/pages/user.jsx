import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileThunk } from "../redux/user/user.actions";
import UserProfile from "../components/userProfile";
import { useParams } from 'react-router-dom'

const User = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchUserProfile = () => {
    console.log('RUNNING DISPATCH FROM FETCHUSERPROFILE')
    return dispatch(fetchUserProfileThunk(id));
  };

  useEffect(() => {
    console.log('FETCHUSERPROFILE FIRING IN USEEFFECT')
    fetchUserProfile();
  }, [id]);

  return ( 
    <div className="text-center">
      <UserProfile user={user} />
    </div>
  );
};

export default User;