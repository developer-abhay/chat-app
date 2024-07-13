import { getChats, getRequests, getUsers, login } from "../redux/UserSlice";

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

const acceptFriendRequest = async (senderId, receiverId, dispatch) => {
  const config = {
    method: "put",
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
  console.log(data.user);
  dispatch(getRequests(data.allRequests));
  dispatch(login(data.user));
};

const createGroupAPI = async (creator, groupName, members) => {
  const config = {
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator,
      groupName,
      members,
    }),
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/createchat`,
    config
  );

  const data = await response.json();
  console.log(data);
};

const fetchAllChats = async (userId, dispatch) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/chats/${userId}`,
    config
  );
  const data = await response.json();
  dispatch(getChats(data.allUserChats));
};

export {
  getAllUSers,
  sendFriendRequest,
  fetchAllRequests,
  cancelFriendRequest,
  acceptFriendRequest,
  createGroupAPI,
  fetchAllChats,
};
