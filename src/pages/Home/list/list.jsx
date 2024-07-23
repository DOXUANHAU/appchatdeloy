import React, { useContext, useEffect, useState } from "react";
import Friend from "../friend/friend";
import "./list.css";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import {
  GET_PEOPLE_CHAT_MES,
  GET_ROOM_CHAT_MES,
  Logout,
  SEND_CHAT,
  CREATE_ROOM,
  JOIN_ROOM,
} from "../../../api/action";
import {
  saveMessage,
  saveGroupMess,
  logout,
  setFriends,
} from "../../../store/userSlice";
import ShowGroup from "../../../components/group/showgroup/GroupShow";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const List = (props) => {
  const [, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const groups = infor.user.infor.groups;
  const userInfo = infor.user.infor;
  const all = [...friends, ...groups];
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleLogout = () => {
    const logoutAction = Logout();
    sender(logoutAction);
  };
  useEffect(() => {
    all.forEach((item) => {
      if (item.type === 0) {
        // nếu là người bạn
        const getPeopleChatMess = GET_PEOPLE_CHAT_MES(item.name); // lấy tin nhắn giữa 2 người
        sender(getPeopleChatMess); // gửi yêu cầu lấy tin nhắn giữa 2 người
      } else if (item.type === 1) {
        // nếu là nhóm
        const getRoomChatMess = GET_ROOM_CHAT_MES(item.nameGroup);
        sender(getRoomChatMess); // gửi yêu cầu lấy tin nhắn trong nhóm
      }

      return () => {};
    });
  }, []);
  // hàm này sẽ xử lý khi click vào 1 người bạn và hiện ra tin nhắn giữa 2 người
  const handleItemOnClick = (item) => {
    if (item.type === 0) {
      // nếu là người bạn
      const getPeopleChatMess = GET_PEOPLE_CHAT_MES(item.name); // lấy tin nhắn giữa 2 người
      sender(getPeopleChatMess); // gửi yêu cầu lấy tin nhắn giữa 2 người
    } else if (item.type === 1) {
      // nếu là nhóm
      const getRoomChatMess = GET_ROOM_CHAT_MES(item.nameGroup);
      sender(getRoomChatMess); // gửi yêu cầu lấy tin nhắn trong nhóm
    }
    props.setChatUser(item);
  };

  // hàm này sẽ xử lý khi nhận được tin nhắn từ server thông qua hàm sender
  const handleGetPeopleChatMess = (payload) => {
    payload.data.forEach((item) => {
      // duyệt qua từng tin nhắn
      const { name, to, mes } = item;
      const isSentByUser = name === infor.user.infor.email; // kiểm tra xem người gửi có phải là người dùng hiện tại không
      dispatch(
        saveMessage({
          name: isSentByUser ? to : name, // nếu là người gửi thì lưu tên người nhận, ngược lại lưu tên người gửi
          mess: { text: mes, sender: name, isSentByUser },
        })
      );
    });
  };

  const handleGetRoomChatMess = (payload) => {
    payload.data.chatData.forEach((item) => {
      const { name, mes } = item;
      const isSentByUser = name === userInfo.email;
      dispatch(
        saveGroupMess({
          nameGroup: payload.data.name,
          messGroup: { text: mes, sender: name, isSentByUser },
        })
      );
    });
  };

  const handleSendChat = (payload) => {
    const check = friends.every((item) => item.name !== payload.data.name);
    if (check) {
      const item = { name: payload.data.name, type: 0, actionTime: "" };
      dispatch(setFriends({ item }));
      sender(SEND_CHAT(payload.data.name, ""));
    }
  };

  useEffect(() => {
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "SEND_CHAT":
          handleSendChat(respone);
          break;
        case "GET_PEOPLE_CHAT_MES":
          handleGetPeopleChatMess(respone);
          break;
        case "LOGOUT":
          dispatch(logout());
          navigate("/login");
          break;
      }
    }
  }, [respone]);

  const findfriend = () => {
    let value = name;
    const send_chat = SEND_CHAT(value, "add friend");
    setName((pre) => "");
    sender(send_chat);
  };

  const joingroup = () => {
    let value = name;
    const join_room = JOIN_ROOM(value);
    setName((pre) => "");
    sender(join_room);
  };

  const creategroup = () => {
    let value = name;
    const create_room = CREATE_ROOM(value);
    setName((pre) => "");
    sender(create_room);
  };

  const getLatestMessage = (name) => {
    let latestMessage = "";

    // Tìm kiếm bạn bè có tên là 'name'
    const friend = friends.find((f) => f.name === name);
    if (friend) {
      const lastMessage = friend.listmessage[friend.listmessage.length - 1];
      if (lastMessage) {
        // Kiểm tra xem tin nhắn được gửi bởi người dùng hiện tại hay không
        const isSentByUser = lastMessage.sender === userInfo.name;
        // Tạo chuỗi tin nhắn dựa trên người gửi và người nhận
        latestMessage = `${isSentByUser ? "Bạn" : lastMessage.sender}: ${
          lastMessage.text
        }`;
      }
    }
    // Tìm kiếm nhóm có tên là 'name'
    const group = groups.find((g) => g.nameGroup === name);
    if (group) {
      const lastMessage = group.listmessage[group.listmessage.length - 1];
      if (lastMessage) {
        // Kiểm tra xem tin nhắn được gửi bởi người dùng hiện tại hay không
        const isSentByUser = lastMessage.sender === userInfo.name;
        // Tạo chuỗi tin nhắn dựa trên người gửi và người nhận
        latestMessage = `${lastMessage.text}`;
        // ${isSentByUser ? "Bạn" : lastMessage.sender}:
      }
    }

    return latestMessage;
  };

  return (
    <div className="list">
      <div className="list_header">
        <div className="img">
          <Link to="/info">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
          </Link>
          <div className="name">
            <span>{userInfo.name}</span>
          </div>
        </div>
        <div className="item log-out" onClick={handleLogout}>
          <div className="icon">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        </div>
      </div>
      <div className="search">
        <div className="searchForm">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="allbtn">
        <button className="btn left" onClick={findfriend}>
          Tìm bạn
        </button>
        <button className="btn right" onClick={joingroup}>
          Vào nhóm
        </button>
        <button className="btn middle" onClick={creategroup}>
          Tạo nhóm
        </button>
      </div>
      <div className="chatList">
        {all &&
          all
            .filter((item) => item.type !== 0 || item.name !== userInfo.name) // Lọc ra những người không phải là người dùng hiện tại
            .map((item, index) => {
              const uniqueKey =
                item.type === 0
                  ? `friend-${item.name}`
                  : `group-${item.nameGroup}`;
              return item.type === 0 ? (
                <Friend
                  key={uniqueKey}
                  img={item.img}
                  name={item.nameGroup || item.name}
                  time={item.time}
                  message={getLatestMessage(item.name)}
                  unread={item.unread}
                  onClick={() => handleItemOnClick(item)}
                />
              ) : (
                <ShowGroup
                  key={uniqueKey}
                  nameGroup={item.nameGroup}
                  messGroup={getLatestMessage(item.nameGroup)}
                  onClick={() => handleItemOnClick(item)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default List;
