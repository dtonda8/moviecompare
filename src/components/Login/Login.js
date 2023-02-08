import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { warningNotyf } from "../elements/Notifications/Notifications";
import { getDatabase, ref, set, get } from "firebase/database";
import  { useNavigate } from 'react-router-dom'
import React from 'react'
import './Login.css'


const Login = ({ watchlist, updateWatchlist, userId }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault()
        const email = document.getElementById('login-email-input').value;
        const password = document.getElementById('login-password-input').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid
                const dbRef = ref(getDatabase());
                get(dbRef, `users/${userId}`)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val().users[userId]
                            data ? updateWatchlist(data.watchlist) : updateWatchlist([])
                        } else updateWatchlist([]);
                        navigate('/')
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch(error => warningNotyf.error(`User not found, Please Create New Account.`));
    }

    const createAccount = (event) => {
        event.preventDefault()
        const email = document.getElementById('create-email-input').value;
        const password = document.getElementById('create-password-input').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid;
                const db = getDatabase();
                set(ref(db, 'users/' + userId), { watchlist : watchlist })
                    .then(navigate('/'));
            })
            .catch((error) => alert("Account with this email was already created, Please Sign In", error.code));
    }

    const toggleSignInMethod = () => {
        const createAccountForm = document.getElementById('create-account-container');
        const loginForm = document.getElementById('login-container');
        createAccountForm.classList.toggle('hide')
        loginForm.classList.toggle('hide')
        createAccountForm.classList.toggle('show')
        loginForm.classList.toggle('show')
    }

    return (
        <div className='sign-in-create-account-container'>
            <div id='login-header'>Login to save your Watchlist</div>

            <form id='login-container' className='show' onSubmit={event => login(event)}>
                <div>
                    <label htmlFor='email' >Email: </label>
                    <input id='login-email-input' name='email' type='email' required />
                </div>
                <div>
                    <label htmlFor='Password'>Password: </label>
                    <input id='login-password-input' name='Password' type='password' required />
                </div>
                <button className='sign-up' type="submit">Login</button>
                <div id='create-account-msg'>Are you new? <button type='button' onClick={toggleSignInMethod}>Create Account</button></div>
            </form>
            
            <form id='create-account-container' className='hide' onSubmit={event => createAccount(event)}>
                <div>
                    <label htmlFor='email' >Email: </label>
                    <input id='create-email-input' name='email' type='email' required />
                </div>
                <div>
                    <label htmlFor='Password'>Password: </label>
                    <input id='create-password-input' name='Password' type='password' minLength="6" required />
                </div>
                <button className='login' type="submit">Create Account</button>
                <div id='sign-in-msg'>Already have an account? <button type='button' onClick={toggleSignInMethod}>Login</button></div>
            </form>

        </div>
    )
}

export default Login;
