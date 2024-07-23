const REGISTER = (user, pass) => {
  return {
    action: "onchat",
    data: {
      event: "REGISTER",
      data: {
        user,
        pass,
      },
    },
  };
};

const Login = (user, pass) => {
  return {
    action: "onchat",
    data: {
      event: "LOGIN",
      data: {
        user,
        pass,
      },
    },
  };
};

const RE_LOGIN = (user) => {
  return {
    action: "onchat",
    data: {
      event: "RE_LOGIN",
      data: {
        user,
        code: "nlu_2055829137", // Điều này cần được điều chỉnh nếu bạn muốn sử dụng mã lặp lại động
      },
    },
  };
};

const Logout = () => {
  return {
    action: "onchat",
    data: {
      event: "LOGOUT",
    },
  };
};

const CREATE_ROOM = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "CREATE_ROOM",
      data: {
        name: nameRoom,
      },
    },
  };
};

const JOIN_ROOM = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "JOIN_ROOM",
      data: {
        name: nameRoom,
      },
    },
  };
};

const GET_ROOM_CHAT_MES = (nameRoom) => {
  return {
    action: "onchat",
    data: {
      event: "GET_ROOM_CHAT_MES",
      data: {
        name: nameRoom,
        page: 1, // Trang dữ liệu, có thể điều chỉnh nếu cần
      },
    },
  };
};

const GET_PEOPLE_CHAT_MES = (namePeople) => {
  return {
    action: "onchat",
    data: {
      event: "GET_PEOPLE_CHAT_MES",
      data: {
        name: namePeople,
        page: 1, // Trang dữ liệu, có thể điều chỉnh nếu cần
      },
    },
  };
};

const SEND_CHAT_TO_ROOM = (nameRoom, mess) => {
  return {
    action: "onchat",
    data: {
      event: "SEND_CHAT",
      data: {
        type: "room",
        to: nameRoom,
        mes: mess,
      },
    },
  };
};

const SEND_CHAT = (people, mess) => {
  return {
    action: "onchat",
    data: {
      event: "SEND_CHAT",
      data: {
        type: "people",
        to: people,
        mes: mess,
      },
    },
  };
};

const CHECK_USER = (userName) => {
  return {
    action: "onchat",
    data: {
      event: "CHECK_USER",
      data: {
        user: userName,
      },
    },
  };
};

const GET_USER_LIST = () => {
  return {
    action: "onchat",
    data: {
      event: "GET_USER_LIST",
    },
  };
};

export {
  REGISTER,
  Login,
  RE_LOGIN,
  Logout,
  CREATE_ROOM,
  JOIN_ROOM,
  GET_ROOM_CHAT_MES,
  GET_PEOPLE_CHAT_MES,
  SEND_CHAT_TO_ROOM,
  SEND_CHAT,
  CHECK_USER,
  GET_USER_LIST,
};
