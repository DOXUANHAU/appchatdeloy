import React from "react";
import "./friend.css";

const Friend = ({ img, name, time, message, unread, onClick }) => {
  return (
      <div className="friend" onClick={onClick}>
        <div className="friendItem">
          <div className="item">
            <div className="img">
              <img src="img/p1.jpg" alt="avatar"/>
            </div>
            <div className="name">
            <div className="info">
                <span>{name}</span>
                <span>{time}</span>
              </div>
              <div className="text">
                <span>{message}</span>
                {unread > 0 && <div className="unread">{unread}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Friend;
