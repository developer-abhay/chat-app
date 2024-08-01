import { getChats, getRequests, getUsers, login } from "../redux/UserSlice";

//--------- User APIs --------- //
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

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ORIGIN}/user/login`,
      config
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(login(data.user));
    }
    return response.status;
  } catch (err) {
    console.log("Internal Server Error");
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

const getAllUsers = async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user`);
  const allUsers = await response.json();
  dispatch(getUsers(allUsers.users));
  return "Success";
};

// ---------- Request API -------------- //
const fetchAllRequests = async (senderId, dispatch) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/request/${senderId}`,
    config
  );
  const data = await response.json();

  dispatch(getRequests(data.allRequests));
  return "Success";
};

//------------ Chat API  ------------ //
const fetchAllChats = async (userId, dispatch) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/chat/${userId}`,
    config
  );
  const data = await response.json();

  dispatch(getChats(data.allUserChats));

  return "Success";
};

//------------ Create Group API  ------------ //
// const createGroupAPI = async (creator, groupName, members, dispatch) => {
//   const config = {
//     method: "post",
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       creator,
//       groupName,
//       members,
//     }),
//   };
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_ORIGIN}/chat/creategroup`,
//     config
//   );
//   return;
// };

const updateGroupAvatarAPI = async (
  updateGroupForm,
  setAvatarLoading,
  dispatch
) => {
  const config = {
    method: "post",
    withCredentials: true,
    body: updateGroupForm,
  };
  for (const [name, value] of updateGroupForm) {
    console.log(`${name}: ${value}`);
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/chat/updateavatar`,
    config
  );

  const data = await response.json();
  dispatch(getChats(data.allUserChats));
  setAvatarLoading(false);
};

const leaveGroupAPI = async (userId, chatId, dispatch) => {
  const config = {
    method: "post",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      chatId,
    }),
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/chat/leavegroup`,
    config
  );
  const data = await response.json();

  dispatch(getChats(data.allUserChats));
  return;
};

// ----------- Message APIs ----------- //
const getChatMessages = async (chatId) => {
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/message/${chatId}`,
    config
  );
  const data = await response.json();
  return data.allMessages;
};

export {
  loginUserAPI,
  registerUserAPI,
  getAllUsers,
  // sendFriendRequest,
  fetchAllRequests,
  // cancelFriendRequest,
  // acceptFriendRequest,
  // createGroupAPI,
  updateGroupAvatarAPI,
  leaveGroupAPI,
  fetchAllChats,
  getChatMessages,
  // sendChatMessages,
};

// const sendChatMessages = async (chatId, senderId, content) => {
//   const config = {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       chatId,
//       content,
//       senderId,
//     }),
//   };

//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_ORIGIN}/message`,
//     config
//   );
//   const data = await response.json();
//   return data.message;
// };

// const cancelFriendRequest = async (senderId, receiverId, dispatch) => {
//   const config = {
//     method: "delete",
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       senderId,
//       receiverId,
//     }),
//   };
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_ORIGIN}/request`,
//     config
//   );
//   const data = await response.json();
//   dispatch(getRequests(data.allRequests));
// };

// const acceptFriendRequest = async (senderId, receiverId, dispatch) => {
//   const config = {
//     method: "put",
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       senderId,
//       receiverId,
//     }),
//   };
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_ORIGIN}/request`,
//     config
//   );
//   const data = await response.json();
//   console.log(data.user);
//   dispatch(getRequests(data.allRequests));
//   dispatch(login(data.user));
// };
