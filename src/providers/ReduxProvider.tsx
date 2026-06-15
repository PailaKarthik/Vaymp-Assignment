import { persistor, store } from "@/redux/store";
import React, { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0066FF" />
          </View>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};
