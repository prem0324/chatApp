import React from "react";
import "./login_form.css";




const LoginForm = ({ isShowLogin }) => {
    // ye kya faltu syntax hai idhar 

    if (isShowLogin===true) {
        return ( 
    <div className= "show" >
      <div className="login-form">
        <div className="form-box solid" onClick={(e) => e.stopPropagation()} >
          <form>
            <h1 className="login-text">Sign In
            </h1>
            
            <label>Username</label>
            <br></br>
            <input type="text" name="username" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}
};

export default LoginForm;

