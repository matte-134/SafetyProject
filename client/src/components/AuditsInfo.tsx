import React from "react";
import { useUserId } from "../context/IdContext";

export const AuditsInfo = () => {
    const { userId } = useUserId();

    return (
        <div>
            <h1>AuditsInfo</h1>
        </div>
    )
}