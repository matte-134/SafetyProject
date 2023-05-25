import React, { useEffect, useState } from 'react';

interface User {
    username: string;
    email: string;
    password: string;
    position: string;
    AuditInstances: AuditInstances[];
}

interface AuditInstances {
    date: string;
    completed: boolean;
    score: number;
}

export const Users = () => {
    const [users, setUsers] = useState<User[]>([])

    const showUsers = async () => {
        const res = await fetch(`http://localhost:5000/audits/read`)
        const users: Array<User> = await res.json()
        if(users) {
            setUsers(users)}
    }

    useEffect(() => {
    showUsers()
    }, [])

    // console.log(users)
    // console.log(users[0].AuditInstances)


    return (
        <div>
        {users.map((user) => (
        <>
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
            <h1>{user.position}</h1>

        </>
            ))}
        </div>
    );
    }