import React, { useEffect } from "react";
import { useUserId } from "../context/IdContext";
import { User } from "../models/user";


export const UserInfo = () => {

    const { userId } = useUserId();
    const [user, setUser] = React.useState<User>({} as User)

    const getUserInfo = async () => {
        // console.log(userId)
        const res = await fetch(`http://localhost:5000/users/${userId}`)
        const userData = await res.json()
        // console.log(res)
        setUser(userData.user)
        console.log(user)
    }

    const createAudit = async () => {
        const res = await fetch(`http://localhost:5000/audits/newaudit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'userId': userId})
        })
        const data = await res.json()
        console.log(data)
    }

    const showAudits =  () => {
        console.log(user.AuditInstances)
    }

    useEffect(() => {
        getUserInfo()
    }, []) 

    console.log(user)
    return (
        <div>
        <div>
            <h1>UserInfo</h1>
            Name: {user.username}
            Email: {user.email}
            Position: {user.position}
        </div>
        <button onClick={showAudits}>Audits</button>
        <div>
            {user.AuditInstances?.map((audit) => (
                <div>
                    <h1>{audit.completed ? "Complete" : "Not Complete"}</h1>
                    <h1>{audit.date}</h1>
                    <h1>{audit.score}</h1>
                    </div>
            ))}
        </div>
        <button onClick={createAudit}>Create Audit</button>
        </div>
    )
    }
