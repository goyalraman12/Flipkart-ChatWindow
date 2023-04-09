import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Chatbox from "./pages/Chatbox";

function App() {
  return (
    <Provider store={store}>
      <Chatbox />
    </Provider>
  );
}

export default App;
