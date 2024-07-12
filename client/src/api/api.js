const getAllUSers = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user`);
  const allUsers = await response.json();
  return allUsers.users;
};

const sendFriendRequest = async (senderId, receiverId) => {
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
  console.log(response);
};

export { getAllUSers, sendFriendRequest };
