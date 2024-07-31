import React, {useState} from 'react'

import './chat.css'
import { Avatar, IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import axios from './axios';


function Chat({messages,userselected})  {
    // const inputRef = useRef(null);
    // we can use useref hook instead of usestate to overcome the problem of re-rendering

    const [input, setInput] = useState('');
    console.log(messages);
    console.log(userselected);

    let usermessage=[];
    
    messages.forEach(message => {
        if (message.name===userselected || message.chatuser===userselected) {
            usermessage.push(message);
        } 
    });
    
    console.log(usermessage);




    const sendMessage =async(e) => {
        e.preventDefault();

       await axios.post("/message/new",{
            message:input,
            // message:inputRef?.current?.value,
            name:"Arihant",
            timestamp:"just now",
            received:true,
            chatuser:userselected
        });

        setInput('');
    //    inputRef.current.value='';

       }


    
    //    function inputWithRef() {
    //     // console.log(inputRef?.current?.value);
    //     return (
    //       <input ref={inputRef} type="text" />
    //     );
    //   }
    // let input=inputRef?.current?.value;





  return (
   
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <div className='chat_headerInfo'>
                <h3 id='chat_user' >{userselected}</h3>
                <p>Last seen at...</p>
            </div>
            <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        

        <div className='chat_body'>



            {usermessage.map((messages) => (
    
                    <p className={`chat_message ${messages.name==='Arihant' && 'chat_receiver'}`}>
                    <span className='chat_name'>{messages.name}</span>
                    {messages.message}
                    <span className='chat_timestamp'>{messages.timestamp}</span>
                    </p>
                
            ))}

        </div>
        {/* <div className='chat_body'>
            {messages.map((messages) => (
                 <p className={`chat_message ${messages.name==='Arihant' && 'chat_receiver'}`}>
                 <span className='chat_name'>{messages.name}</span>
                 {messages.message}
                 <span className='chat_timestamp'>{messages.timestamp}</span>
             </p>
            ))}

        </div> */}

        <div className='chat_footer'>
            <IconButton>
                <InsertEmoticon/>
            </IconButton>
            <form>
                {/* <input type="text" onChange={inputWithRef} placeholder='Type a message' ref={inputRef} /> */}
                <input  value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Type a message' />
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <MicIcon/>
        </div>


    </div>
  )
}

export default Chat