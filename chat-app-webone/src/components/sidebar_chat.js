import React, {useRef} from 'react'
import './sidebar_chat.css'
import { Avatar } from '@mui/material'

function Sidebar_chat(alluser, handleuser) {
  // const userlist=alluser.alluser;

  const userlist=alluser.alluser;
  const username = useRef(null);

  // console.log(alluser.handleuser);
  console.log(userlist);
  // const items=[1,2,3,4,5,6,7];

   const userselect = (i) => {
    // console.log(userlist[i].chatuser);
   alluser.handleuser(userlist[i].name);
  }


  let components = []; 
  for (let i = 0; i < userlist.length; i++) { 
      components.push(
         <div className='sidebar_chat' onClick={() => userselect(i)}  >
      <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <div className='sidebar_chatInfo'>
                <h2 ref={username}>{userlist[i].name}</h2>
                <p>Last message...</p>
            </div>
           </div>
            )}  
return <div>{components}</div> ; }

  // return (
    // <div className='sidebar_chat'>
  //   <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
  //       <div className='sidebar_chatInfo'>
  //           <h2>Room Name </h2>
  //           <p>Last message...</p>
  //       </div>
  //   </div>
  // )}


export default Sidebar_chat