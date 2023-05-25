import React from "react";
import { useAuth } from "../context/AuthContext";
import { useUserId } from "../context/IdContext";
import styles from "./Login.module.css";

export const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("Please log in");
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { userId, setUserId } = useUserId();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginUser = async () => {
            const res = await fetch(`http://localhost:5000/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({'username': username, 'password': password})
            })
            const data = await res.json()
            setMessage(data.msg)
            console.log(data.userId)
            if(data.loggedIn) {
                setIsLoggedIn(true)
                setUserId(data.userId)
            }
        }
        loginUser()
        setUsername("")
        setPassword("")
    }

    return (
        <div className={styles.parent}>
            <div className={styles.box} contentEditable>
        <h1>Login</h1>
        {isLoggedIn ? 
        <p>You are now logged in</p> 
        :
        <>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
            </div>
            <div className={styles.form}>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>
            <div className={styles.form}>
            <button type="submit">Log In</button>
            <button>Register</button>
            </div>
        </form>
        </>
        }
        </div>
        </div>
    );
    };