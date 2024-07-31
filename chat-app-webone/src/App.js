import React, {useEffect ,useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/chat';
import Pusher from 'pusher-js';
import axios from "./components/axios";
import LoginForm from './components/login_form';
import "./components/login_form.css";




function App() {

  const [messages, setMessages ] = useState([]);
  const [alluser, setAlluser] = useState([]);
  const[userselected, setUserselected] = useState(0);


const handleuserselected = (i) => {
  console.log(`user selected=${i}`);
  setUserselected(i);
  console.log(`user selected=${userselected}`); 
}


useEffect(() => {
  axios.get("/message/sync").then((response) => {
    setMessages(response.data);
    // console.log("re-rendered");
  })
}, [])

useEffect(() => {
  axios.get("/chatuser/sync").then((response) => {
    setAlluser(response.data);
    // console.log(response.data);
    // console.log("re-rendered");
  })
}, [])


let [isShowLogin, setIsShowLogin] = useState(false);


const handleLoginClick = () => {
  setIsShowLogin((isShowLogin)=>!isShowLogin);
}
const closeLogin = () => {
  if (isShowLogin) {
  setIsShowLogin((isShowLogin)=>false);
 }
}

const handleOptions = () => {
  console.log("add options jsx here");
}

useEffect(() => {
  var pusher = new Pusher('f4a0acda517a03105c5f', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage) => {
    // alert(JSON.stringify(newMessage));
    setMessages([...messages, newMessage]);
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  }
}, [messages])


useEffect(() => {
  var pusher = new Pusher('f4a0acda517a03105c5f', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe('chatusers');
  channel.bind('inserted', (newUser) => {
    // alert(JSON.stringify(newUser));
    setAlluser([...alluser, newUser]);
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  }
}, [alluser])



// console.log(isShowLogin);

// console.log(messages);

  return (<>

    <div className={`app ${isShowLogin === true && "blur"}`} onClick={closeLogin}>
    {/* <div className="app" onClick={closeLogin}> */}
      <div className="app_body" >

      <Sidebar handleLoginClick={handleLoginClick} handleOptions={handleOptions} alluser={alluser} handleuserselected={handleuserselected}/>
      <Chat messages={messages} userselected={userselected}/>


      </div>
    </div>
      <LoginForm isShowLogin={isShowLogin} />

  </>
  );
}

export default App;