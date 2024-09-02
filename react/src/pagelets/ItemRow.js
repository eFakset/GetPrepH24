import React from "react";

export default function ItemRow ({item}) 
{
    return (
        <tr className="list">
            <td className="list">{item.id}</td>
            <td className="list">{item.name}</td>
        </tr>
    )
}