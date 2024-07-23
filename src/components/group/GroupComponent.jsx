import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { SEND_CHAT_TO_ROOM, GET_ROOM_CHAT_MES } from "../../api/action";
import { useDispatch, useSelector } from "react-redux";
import { saveGroupMess, clearGroupMess } from "../../store/userSlice";
import useFirebase from "../../firebaseSocket/Firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Styles from "./styles.module.scss";
import classNames from "classnames/bind";
import InfinityComponent from "../animation/Infinity";

const cx = classNames.bind(Styles);

function GroupComponent(props, refHan) {
  // Function to scroll to the bottom of the element
  const firebaseState = useFirebase();
  //
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  // function to handle input from the parent components
  useImperativeHandle(refHan, () => ({
    clearInput() {
      setNewMessage((p) => "");
      setFile((p) => null);
      setPreview((p) => "");
    },
  }));
  const fileOnClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please select an image file.");
      // alert(selectedFile.type);
      // setFile(selectedFile);
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   setPreview(event.target.result);
      // };
      // reader.readAsDataURL(selectedFile);
    }
  };
  //
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const groups = infor.user.infor.groups;
  const [group, setGroup] = useState(
    groups.find((item) => item.nameGroup === props.group.nameGroup)
  );
  const [messages, setMessages] = useState(group.listmessage);
  const [newMessage, setNewMessage] = useState("");
  //save message into friend in redux
  useEffect(() => {
    setGroup((pre) =>
      groups.find((item) => item.nameGroup === props.group.nameGroup)
    );
    setMessages((pre) => group.listmessage);
  }, [props.group, group, groups]);

  const handleSendeChatMess = (payload) => {
    // let mess = payload.data.mes;
    // let nameSender = payload.data.name;
    // let namegroup = payload.data.to;
    // dispatch(
    //   saveGroupMess({
    //     name: payload.data.name,
    //     mess: {
    //       text: payload.data.mes,
    //       isSentByUser: payload.data.name !== infor.user.infor.email,
    //     },
    //   })
    // );
    const newChat = [
      ...messages,
      {
        text: payload.data.mes,
        isSentByUser:
          payload.data.name === infor.user.infor.email ||
          payload.data.name === infor.user.infor.name,
      },
    ];
    setNewMessage("");
    setMessages(newChat);
    // data:{id: 0, name: 'doxuanhau@gmail.com', type: 0, to: 'ka@gmail.com', mes: '123123123123123'}
    // event:"SEND_CHAT"
    // status:"success"
  };
  // const handleGetRoomChatMess = (payload) => {
  //   // createAt: "2024-06-16 09:14:18";
  //   // id: 31810;
  //   // mes: "asdasdasdasd";
  //   // name: "doxuanhau@gmail.com";
  //   // to: "hauvanhungnguoiban@gmail.com";
  //   // type: 1;
  //   payload.data.chatData.reverse().map((item) => {
  //     // let name = item.name; //sender
  //     // let to = item.to; // retriver
  //     // let text = item.mes;
  //     // let a = name === infor.user.infor.email;
  //     dispatch(
  //       saveGroupMess({
  //         nameGroup: item.to,
  //         messGroup: {
  //           text: item.mes,
  //           isSentByUser: item.name === infor.user.infor.email,
  //         },
  //       })
  //     );
  //     // const newChat = [...messages, { text: text, isSentByUser: a }];
  //     setMessages((pre) => [
  //       ...pre,
  //       { text: item.mes, isSentByUser: item.name === infor.user.infor.email },
  //     ]);
  //   });
  // };

  const handleGetRoomChatMess = (payload) => {
    dispatch(clearGroupMess({ nameGroup: group.nameGroup }));

    payload.data.chatData.reverse().forEach((item) => {
      let isSentByUser =
        item.name === infor.user.infor.email ||
        item.name === infor.user.infor.name;
      dispatch(
        saveGroupMess({
          nameGroup: item.to,
          messGroup: {
            text: item.mes,
            isSentByUser,
          },
        })
      );

      // Ensure messages state is updated correctly
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: item.mes,
          isSentByUser: item.name === infor.user.infor.email,
        },
      ]);
    });
  };

  useEffect(() => {
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "SEND_CHAT":
          if (respone.data.type === 1) handleSendeChatMess(respone);
          break;
        case "GET_ROOM_CHAT_MES":
          handleGetRoomChatMess(respone);
          break;
        default:
          break;
      }
    }
  }, [respone]);
  //
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const handleEmojiOnClick = (e) => {
    setShowEmojiPicker((p) => !p);
    setSelectedEmoji((p) => e.imageUrl);
    console.log(e.imageUrl);
    setPreview((p) => e.imageUrl);
  };
  //

  const handleSendGroupMessages = async () => {
    setUploading((p) => !p);
    if (newMessage.trim()) {
      const newChat = [...messages, { text: newMessage, isSentByUser: true }];
      setMessages(newChat);
      setNewMessage("");
      sender(SEND_CHAT_TO_ROOM(props.group.nameGroup, newMessage));
      setUploading((p) => !p);
    } else if (preview && file) {
      const id = uuidv4();
      const path = infor.user.infor.email + id + file.name;
      const storageRef = ref(
        firebaseState,
        `images/${infor.user.infor.email}/${path}`
      );
      try {
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        // https://firebasestorage.googleapis.com/v0/b/chatappsocket-83a71.appspot.com/o/images%2Fdoxuanhau%40gmail.com%2Fdoxuanhau%40gmail.com9192e7ce-c0b0-433e-998b-2baefe4ca952mainhome.png?alt=media&token=fc5d7695-64ed-4d6b-96bc-cc69c0b4eb4d
        if (downloadUrl) {
          const url = `knuckleball${downloadUrl}`;
          // //
          // dispatch(
          //   saveGroupMess({
          //     name: group.nameGroup,
          //     mess: { text: url, isSentByUser: true },
          //   })
          // );
          setFile((p) => null);
          setPreview((p) => "");
          //
          const newChat = [...messages, { text: url, isSentByUser: true }];
          setMessages(newChat);
          setNewMessage("");
          sender(SEND_CHAT_TO_ROOM(props.group.nameGroup, url));
        }
      } catch (error) {
        console.error("Error uploading file: ", error);
        alert("Error uploading file!");
      } finally {
        setUploading((p) => !p);
      }
    } else if (preview) {
      const newChat = [...messages, { text: preview, isSentByUser: true }];
      setMessages((p) => newChat);
      setNewMessage((p) => "");
      sender(SEND_CHAT_TO_ROOM(props.group.nameGroup, preview));
      setUploading((p) => !p);
      // setShowEmojiPicker((p) => !p);
      setSelectedEmoji((p) => "");
      setPreview((p) => "");
    }
  };
  const mainElement = useRef();
  const scrollToBottom = () => {
    if (mainElement.current) {
      const { scrollHeight, clientHeight } = mainElement.current;
      mainElement.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  return (
    <div className={cx("chatContainer")}>
      <div className={cx("header")}>
        <div className={cx("item")}>
          <div className={cx("img")}>
            {/* <img className={cx("imgin")} src="img/p1.jpg" alt="avatar" /> */}
            <img src="img/p2.jpg" alt="avatar" />
          </div>
          <div className={cx("name")}>
            <div className={cx("info")}>
              <span>{group.nameGroup}</span>
            </div>
            <div className={cx("icons")}>
              <FontAwesomeIcon className={cx("icon")} icon={faPhone} />
              <FontAwesomeIcon className={cx("icon")} icon={faVideo} />
              <FontAwesomeIcon className={cx("icon")} icon={faBars} />
            </div>
          </div>
        </div>
      </div>
      <div ref={mainElement} className={cx("main")}>
        {messages.map((message, index) => {
          return message.text.startsWith("knuckleballhttps") ||
            message.text.startsWith("https://cdn.jsdelivr.net/npm/") ? (
            <img
              key={index}
              alt="image"
              // src="img/p2.jpg"
              // alt="avatar"
              src={
                message.text.startsWith("knuckleballhttps")
                  ? message.text.slice(
                      "knuckleball".length,
                      message.text.length
                    )
                  : message.text
              }
              className={cx(
                "messageimg",
                `${message.isSentByUser ? "userimg" : "friendimg"}`
              )}
            />
          ) : (
            <div
              key={index}
              className={cx(
                "message",
                `${message.isSentByUser ? "user" : "friend"}`
              )}
            >
              {message.text}
            </div>
          );
        })}
        {showEmojiPicker && (
          <div className={cx("emojipicker")}>
            <EmojiPicker onEmojiClick={handleEmojiOnClick} />
          </div>
        )}
      </div>
      <div className={cx("footer")}>
        {preview ? (
          <img
            // ref={fileInputRef}
            src={preview || selectedEmoji}
            alt="Preview"
            className={cx("previewimg")}
          />
        ) : (
          <input
            className={cx("input")}
            type="text"
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        )}
        <div className={cx("sendItem")}>
          <FontAwesomeIcon
            className={cx("icon")}
            icon={faFaceSmile}
            onClick={() => {
              setShowEmojiPicker((p) => !p);
            }}
          />
          <input
            className={cx("inputfile")}
            type="file"
            name=""
            id="fileInput"
            ref={fileInputRef}
            onChange={handleChangeFileInput}
          />
          <FontAwesomeIcon
            onClick={fileOnClick}
            className={cx("icon")}
            icon={faPaperclip}
          />
          {uploading ? (
            <InfinityComponent></InfinityComponent>
          ) : (
            <div className={cx("send")} onClick={handleSendGroupMessages}>
              <span>Send</span>
              <FontAwesomeIcon className={cx("icon")} icon={faPaperPlane} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(GroupComponent);
