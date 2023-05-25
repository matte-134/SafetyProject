import React from "react";
import styles from "./Register.module.css"
import { passwordCheck } from "../utils/passwordCheck"; 

export const Register = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [position, setPosition] = React.useState("")
    const [drop, setDrop] = React.useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
            const registerUser = async () => {
            const res = await fetch(`http://localhost:5000/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({'username': username, 'password': password, 'email': email, 'position': position})
            })
            const data = await res.json()
            console.log(data)
            }
            registerUser()
            setUsername("")
            setPassword("")
            setEmail("")
            setPosition("")
            setDrop("")
    }


    return (
        <div className={styles.parent}>
            <div className={styles.box} contentEditable>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
            </div>
            <div className={styles.form}>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className={styles.form}>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>
            <div className={styles.form}>
            <label>Position:</label>
            <select className='addButtonI' onChange={e => setPosition(e.target.value)} required>
                    <option value={drop} label='Select Position' selected disabled></option>
                    <option value="Buddy">Buddy</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="2nd Assistant">2nd Assistant</option>
                    <option value="1st Assistant">1st Assistant</option>
                    <option value="Patra">Patrao</option>
                </select>
            </div>
            <div className={styles.form}>
            <button>Register</button>
            </div>
        </form>
        </div>
        </div>
    )
}