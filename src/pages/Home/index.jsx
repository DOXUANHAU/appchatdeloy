import React, { useContext, useEffect, useRef, useState } from "react";
import List from "./list/list";
import "./home.css";
import Chat from "./chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { logout, setFriends, setGroups } from "../../store/userSlice";
import GroupComponent from "../../components/group/GroupComponent";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const nav = useNavigate();
  console.log(respone);
  const infor = useSelector((state) => state.reducer);
  if (infor.user.status !== "Auth") nav("/login");

  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreateRoom = (payload) => {
    const item = { name: payload.data.name, type: 1, actionTime: "" };
    dispatch(setGroups({ item }));
  };

  const hanldeGetUserList = (payload) => {
    payload.data.forEach((item) => {
      return item.type === 0
        ? dispatch(setFriends({ item }))
        : dispatch(setGroups({ item }));
    });
  };

  useEffect(() => {
    setName(infor.user.infor.name);

    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "GET_USER_LIST":
          hanldeGetUserList(respone);
          break;
        case "JOIN_ROOM":
        case "CREATE_ROOM":
          handleCreateRoom(respone);
          break;
        default:
          break;
      }
    } else if (respone && respone.status === "error") {
      switch (respone.event) {
        case "JOIN_ROOM":
          alert("Room not exist");
          break;
        default:
          break;
      }
    }
  }, [respone]);

  const inputFillGroup = useRef();

  const handleDeleteFillInput = () => {
    if (inputFillGroup.current) {
      inputFillGroup.current.clearInput();
    }
  };

  const handleSetSelectedUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="home">
      <div className="content-container">
        <div className="list-container">
          <List
            setChatUser={handleSetSelectedUser}
            handleDeleteFillInput={handleDeleteFillInput}
          />
        </div>
        <div className="chat-container">
          {selectedUser ? (
            selectedUser.type === 0 ? (
              <Chat friend={selectedUser} ref={inputFillGroup} />
            ) : (
              <GroupComponent group={selectedUser} refHan={inputFillGroup} />
            )
          ) : (
            <div className="empty-chat">Trống</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
