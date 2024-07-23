import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    infor: { name: "", email: "", friends: [], groups: [], messages: [] },
    status: "UnAuth",
  },
  reducers: {
    setName: (state, action) => {
      state.infor.name = action.payload;
      state.status = "Auth";
    },
    setEmail: (state, action) => {
      state.infor.email = action.payload;
      state.status = "Auth";
    },
    setFriends: (state, action) => {
      const { name, type, actionTime, avatarUrl } = action.payload.item;
      const newFriend = {
        name,
        listmessage: [], // lưu tin nhắn của người dùng
        type,
        actionTime,
        avatarUrl,
      };
      state.infor.friends.push(newFriend);
      state.status = "Auth";
    },
    // lưu tin nhắn vào danh sách tin nhắn của người dùng
    saveMessage: (state, action) => {
      // Lấy tên người dùng và tin nhắn từ action
      const { name, mess } = action.payload;
      // Tìm vị trí của người dùng trong danh sách bạn bè
      const friendIndex = state.infor.friends.findIndex((f) => f.name === name);

      // Nếu người dùng tồn tại trong danh sách bạn bè
      if (friendIndex !== -1) {
        const friend = state.infor.friends[friendIndex]; // Lấy thông tin người dùng
        if (mess && mess.text && mess.sender) {
          // Kiểm tra xem tin nhắn có dữ liệu không
          const isCurrentUser = mess.sender === state.infor.email; // Kiểm tra xem người gửi có phải là người đăng nhập không
          const message = {
            text: mess.text,
            sender: mess.sender,
            type: isCurrentUser ? "currentUser" : "otherUser",
            time: new Date().toISOString(),
          };
          friend.listmessage.push(message); // Thêm tin nhắn vào danh sách tin nhắn của người dùng
        }
        state.infor.friends[friendIndex] = { ...friend }; // Cập nhật thông tin người dùng
      }
    },

    clearMessage: (state, action) => {
      const { name } = action.payload;
      const friend = state.infor.friends.find((f) => f.name === name);
      if (friend) {
        friend.listmessage = []; // Clear messages for a specific friend
      }
    },
    setGroups: (state, action) => {
      const { name, type, actionTime } = action.payload.item;
      const newGroup = {
        nameGroup: name,
        listmessage: [],
        type: type || 1,
        actionTime: actionTime || "",
      };
      state.infor.groups.push(newGroup);
      state.status = "Auth";
    },
    saveGroupMess: (state, action) => {
      const { nameGroup, messGroup } = action.payload;
      const group = state.infor.groups.find((g) => g.nameGroup === nameGroup);
      if (group) {
        // messGroup.forEach((message) => {
        const isSentByUser = messGroup.isSentByUser;
        group.listmessage = [
          ...group.listmessage,
          {
            text: messGroup.text,
            isSentByUser,
          },
        ];
        // });
      }
    },
    clearGroupMess: (state, action) => {
      const { nameGroup } = action.payload;
      const group = state.infor.groups.find((g) => g.nameGroup === nameGroup);
      if (group) {
        group.listmessage = []; // Clear messages for a specific group
      }
    },
    logout: (state, action) => {
      return {
        ...state,
        infor: { name: "", email: "", friends: [], groups: [] },
        status: `${"UnAuth"}`,
      };
      // state.infor = { name: "", email: "", friends: [], groups: [] };
      // state.status = "UnAuth";
    },
    saveImageURL: (state, action) => {
      const { name, imageUrl } = action.payload;
      const friendIndex = state.infor.friends.findIndex((f) => f.name === name);
      if (friendIndex !== -1) {
        const friend = state.infor.friends[friendIndex];
        const imageMessage = {
          imageUrl: imageUrl, // Lưu URL của ảnh
          sender: state.infor.name,
          type: "currentUser",
          time: new Date().toISOString(),
        };
        friend.listmessage.push(imageMessage);
        state.infor.friends[friendIndex] = { ...friend };
      }
    },
  },
});

export const {
  setName,
  setEmail,
  setFriends,
  setGroups,
  saveMessage,
  clearMessage,
  saveGroupMess,
  clearGroupMess,
  saveImageURL,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
