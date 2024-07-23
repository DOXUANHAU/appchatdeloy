import React, { useEffect, useRef } from "react";
import "./message.css";

const Message = ({ text, sender, isSentByUser, img }) => {
    const messageRef = useRef(null);

    useEffect(() => {
        // Cuộn tới phần tử tin nhắn cuối cùng khi component được render hoặc tin nhắn mới được thêm vào
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [text]); // Theo dõi thay đổi của tin nhắn để cuộn tới tin nhắn mới

    // Kiểm tra nếu tin nhắn là ảnh (bắt đầu bằng "data:image/")
    const isImageMessage = text.startsWith("data:image/");

    return (
        <div ref={messageRef} className={`messageContainer ${isSentByUser ? "sent" : "received"}`}>
            {/* Hiển thị avatar của người gửi tin nhắn đối phương */}
            {!isSentByUser && (
                <div className="avatar">
                    <img src="img/p1.jpg" alt="avatar"/>
                </div>
            )}
            {/* Nếu tin nhắn là ảnh, hiển thị ảnh, ngược lại hiển thị văn bản */}
            {isImageMessage ? (
                <div className="imageMessage">
                    <img src={text} alt="Sent as image" />
                </div>
            ) : (
                <div className={`messageBox ${isSentByUser ? "sentMessage" : "receivedMessage"}`}>
                    <p className="messageText">{text}</p>
                    {/* Hiển thị tên người gửi tin nhắn đối phương */}
                    {!isSentByUser && <p className="messageSender">{sender}</p>}
                </div>
            )}
        </div>
    );
};

export default Message;
