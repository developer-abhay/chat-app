import { getChats, getRequests, getUsers, login } from "../redux/UserSlice";

const loginUserAPI = async (username, password, dispatch) => {
  const config = {
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/login`,
    config
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(login(data.user));
  } else {
    console.log("There was some error");
  }
};

const registerUserAPI = async (signupForm, dispatch) => {
  const config = {
    method: "post",
    withCredentials: true,
    body: signupForm,
  };
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ORIGIN}/user/signup`,
      config
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error.message);
    }
    if (response.ok) {
      const data = await response.json();
      dispatch(login(data.user));
      navigate("/");
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllUSers = async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user`);
  const allUsers = await response.json();
  dispatch(getUsers(allUsers.users));
  console.log(allUsers.users);
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
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/creategroup`,
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

const getChatMessages = async (chatId) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/message/${chatId}`,
    config
  );
  const data = await response.json();
  return data.allMessages;
};

const sendChatMessages = async (chatId, senderId, content) => {
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      content,
      senderId,
    }),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/user/message`,
    config
  );
  const data = await response.json();
  return data.message;
};

export {
  loginUserAPI,
  registerUserAPI,
  getAllUSers,
  sendFriendRequest,
  fetchAllRequests,
  cancelFriendRequest,
  acceptFriendRequest,
  createGroupAPI,
  fetchAllChats,
  getChatMessages,
  sendChatMessages,
};
