import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { useRouter } from "expo-router";

const AuthContext = React.createContext();

export const BASE_URL = "https://stagingstudioenterprisebackend.shorthills.ai";

export function useAuthContext() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useAuthContext must be wrapped in a <ContextProvider />"
      );
    }
  }

  return value;
}

export function ContextProvider({ children }) {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            email: action.email,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            email: action.email,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            email: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,   
      email: null,
    }
  );

  async function setStorageItemAsync(key, value) {
    if (Platform.OS === "web") {
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      if (value == null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    }
  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let email;
      if (Platform.OS === "web") {
        try {
          userToken = localStorage.getItem("token");
          userToken = localStorage.getItem("email");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          userToken = await SecureStore.getItemAsync("token");
          userToken = await SecureStore.getItemAsync("email");
        } catch (e) {
          console.log(e);
        }
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken, email });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data);
        const { email, password } = data;
        const credentials = { email, password };
        // let loginSuccess = false;
        try {
          const res = await fetch(
            `${BASE_URL}/api/users/login/?login_type=CREDENTIALS`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          // if (!res.ok) {
          //   throw new Error(`HTTP error! Status: ${res.status}`);
          // }
          const data = await res.json();
          console.log(data, res.status);
          if (res.status === 403) {
            return { ...data, status: res.status };
          } else if (res.status === 202) {
            loginSuccess = true;
            const { access_token, email } = data;
            await setStorageItemAsync("token", access_token);
            await setStorageItemAsync("email", email);
            dispatch({ type: "SIGN_IN", token: access_token ,email});
          }
        } catch (error) {
          console.error("Sign In error:", error?.message);
          return {
            status: 505,
            message: "Internal server error.Please try again later.",
          };
        }

        // let token = "dummy";
        // await setStorageItemAsync("token", token);
        // dispatch({ type: "SIGN_IN", token: token });
      },
      signOut: async () => {
        await setStorageItemAsync("token", null);
        await setStorageItemAsync("email", null);
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: token });
      },
      state,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
