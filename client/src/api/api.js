import { getRequests, getUsers } from "../redux/UserSlice";

const getAllUSers = async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user`);
  const allUsers = await response.json();
  dispatch(getUsers(allUsers.users));
};

const fetchAllRequests = async (senderId, dispatch) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/request/${senderId}`,
    config
  );
  const data = await response.json();
  console.log(data);
  dispatch(getRequests(data.allRequests));
};

const sendFriendRequest = async (senderId, receiverId, dispatch) => {
  const config = {
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId,
      receiverId,
    }),
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/request`,
    config
  );
  const data = await response.json();
  dispatch(getRequests(data.allRequests));
};

const cancelFriendRequest = async (senderId, receiverId, dispatch) => {
  const config = {
    method: "delete",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId,
      receiverId,
    }),
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/request`,
    config
  );
  const data = await response.json();
  dispatch(getRequests(data.allRequests));
};

export {
  getAllUSers,
  sendFriendRequest,
  fetchAllRequests,
  cancelFriendRequest,
};
