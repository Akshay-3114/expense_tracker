import React  from "react";
import  ReactDOM  from "react-dom";
import { SpeechProvider } from "@speechly/react-client";

import { Provider } from "./Context/context";
import App from './App';
import './index.css';

ReactDOM.render(
  <SpeechProvider appId="c5d0a8d7-90ab-44a1-82a7-d8b77e8e0f58" language="en-US" >
      <Provider>
          <App />
     </Provider>
  </SpeechProvider>,
     document.getElementById('root'));