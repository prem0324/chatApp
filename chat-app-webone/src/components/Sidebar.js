import React, {useEffect, useRef,useState} from 'react'
import './sidebar.css'
import SidebarChat from './sidebar_chat.js'
import logo from '../images/image.png'
// import { IconButton,SearchIcon } from '@mui/material/Search'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { MoreVert, SearchOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import axios from './axios.js';
// import ChatIcon from '@mui/icons-material/Chat'



function Sidebar({handleLoginClick,handleOptions,alluser,handleuserselected }) {


  const handleLogin = () => {
    handleLoginClick(); 
  }

  const options = () => {
    // allchat.current.append({SidebarChat});
    handleOptions(2);
    console.log(alluser);
    // setAlluserschats(alluser);
  }

  const handleuser = (i) => {
    handleuserselected(i);
  }
  

  const allchat=useRef(null)
  const inputRef = useRef(null);
  let showuserarr=[]

  // const 1alluserchats=alluser;
  
  const [alluserchats, setAlluserschats] = useState(alluser);
  // ??? it would not work without this useEffect idk why and this usestate is not working properly either??? 
  useEffect(() => {
    setAlluserschats(alluser);
  },[alluser])
  

  // const [alluserchats, setAlluserschats] = useState(alluser);
  

  function inputWithRef(e) {
      // you can set a search option for added user 
        // console.log(inputRef?.current?.value);
        // console.log(alluserchats);

        // if (inputRef?.current?.value)
        //  {alluser.map((user)=>{
        //   if (user.name===inputRef?.current?.value) {
        //      console.log(user); 
        //     setAlluserschats([user]);
        //     // console.log(allusers);
        //   }
        //  })}

         if (!inputRef?.current?.value) {
          setAlluserschats(alluser);
         }

         //just check if search user matchs with userdata
         if (inputRef?.current?.value) {
         console.log(alluser.map((user)=>user.name.toLowerCase().includes(inputRef?.current?.value.toLowerCase())));
         }
        
        if (inputRef?.current?.value) {
        alluser.forEach(quser => {
          if (quser.name.toLowerCase().includes(inputRef?.current?.value.toLowerCase())) {
            // console.log(`this id matched = ${quser.name}`);
            showuserarr.push(quser);
          }
          setAlluserschats(showuserarr);
        });
      }

        return (
          <input ref={inputRef} type="text" />
        );

      }

  function new_user(e) {
    e.preventDefault();
    console.log(`you entered:- ${inputRef.current.value}`);
    axios.post("/chatuser/newuser",{
      name:`${inputRef.current.value}`,
      number:7777777777
    });

    inputRef.current.value="";
  }


  return (
    <>
    <div className='sidebar'>
      
      <div className='sidebar_header'>
        <Avatar src={logo} />

        <div className='sidebar_headerRight'>
        <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
        <IconButton>
        {/* <ChatIcon/> */}
        <AddCommentIcon onClick={handleLogin} />
        </IconButton>
        <IconButton>
        <MoreVert onClick={options}/>
        </IconButton>
        </div>
      </div>


    <div className='sidebar_search'>
      <div className='sidebar_searchContainer'>
        <SearchOutlined/>
    <form>
        <input placeholder="Search or start new chat" type="text" onChange={inputWithRef} ref={inputRef} />
        <button onClick={new_user} type='submit'>Search</button>
    </form>

      </div>

      </div>

    <div className='sidebar_chats' ref={allchat}>

      <SidebarChat alluser={alluserchats} handleuser={handleuser}/>
      {/* <SidebarChat/>
      <SidebarChat/>
      <SidebarChat/> */}
        
    </div>

    </div>
   
    </>
  ) 
}

export default Sidebar
