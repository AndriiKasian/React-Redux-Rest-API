import { Provider } from "react-redux";
import Posts from './components/posts/Posts';
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  );
}

export default App;
