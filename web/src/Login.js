import React, { useState } from 'react';
import './global.css';
import './Login.css';
import api from './services/api'
import { withRouter, Redirect} from 'react-router-dom';



function Login(props){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [willRegister, setWillRegister] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        setWillRegister(true)
    }

    async function handleMakeRegister(e){
        e.preventDefault()

        try{
            const response = await api.post('/auth/register', {
                "firstName": firstName,
                "lastName" :lastName,
                "email": email,
                "userName": username,
                "password": password

            })
            setWillRegister(false)
        } catch(error){
            if(error.response){
                console.log(error.response.data)
            }
        }
    }

    async function handleLogin(e){
        e.preventDefault()
        
        try{
            const response = await api.post('/auth/login', {
                "userName":username,
                "password":password
            })
            
            console.log(response.headers)
            setLoggedIn(true)
        } catch (error){
            if(error.response){
                console.log(error.response.data)
            }
        }
    }

    return(
        <>
            {isLoggedIn ? <Redirect to="/main" /> : null }
            

            {willRegister ? <div id="login">
                <form onSubmit={handleMakeRegister}>
                <div className="input-block">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        name="firstName" 
                        id="firstName" 
                        required/>  
                    </div>
                    <div className="input-block">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        name="lastName" 
                        id="lastName" 
                        required/>  
                    </div>
                    <div className="input-block">
                    <label htmlFor="email">Email</label>
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email" 
                        id="email" 
                        required/>  
                    </div>
                    <div className="input-block">
                    <label htmlFor="username">Username</label>
                    <input 
                        value={username}
                        name="username" 
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        required />
                    </div>
                    <div className="input-block">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        id="password" 
                        required/>  
                    </div>   
                    <button 
                        className="register"
                        typ="submit"
                    >
                    Register
                    </button>
                </form>
            </div> : <div id="login">
                <form onSubmit={handleLogin}>
                    <div className="input-block">
                    <label htmlFor="username">Username</label>
                    <input 
                        value={username}
                        name="username" 
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        required />
                    </div>
                    <div className="input-block">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password" 
                        id="password" 
                        required/>  
                    </div>   

                    <button className="login" type="submit">
                    Login
                    </button>
                    <button 
                        className="register"
                        onClick={handleRegister} 
                    >
                    Register
                    </button>
                </form>
            </div>}
        </>
    )
}

export default withRouter(Login);