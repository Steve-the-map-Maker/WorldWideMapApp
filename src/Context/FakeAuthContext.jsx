import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const intState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuth: action.payload,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      throw new Error("Fix your shit lol");
  }
}
const FAKE_USER = {
  name: "Steve",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
console.log(FAKE_USER.email);

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, intState);

  function login(email, password) {
    console.log(FAKE_USER.email);
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the provider!!");
  return context;
}

export { AuthProvider, useAuth };
