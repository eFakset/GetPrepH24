import React from "react";
const status = require("../Common.js").checkStatus;

export default function Stores() 
{
    document.title = "Dagligvare - butikker";

    const [stores, setStores] = React.useState(null);

    React.useEffect(() => {
        fetch("/server/butikker")
            .then(status)
            .then((response) => response.json())
            .then((data) => setStores(data.message))
            .catch(error => {alert("Feil ved les av butikker: " + error)});
      }, []);

    return (
        <div>
            <h2 align="center">Butikker</h2>
            <StoreTable stores={stores} />
        </div>
    )
}

function StoreTable({ stores }) 
{
    const rows = [];
    if (stores)
    {
        stores.forEach((Store) =>
        {
            rows.push(<StoreRow store={Store} key={Store.id} />);
        });
    }

    return (
        <table align="center">
        <thead>
            <tr>
            <th className="list">Fylke</th>
            <th className="list">Kommune</th>
            <th className="list">ButikkNr</th>
            <th className="list">Butikk</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
    );
}

function StoreRow ({store})
{
    return (
        <tr className="list">
            <td className="list">{store.countyName}</td>
            <td className="list">{store.municipalityName}</td>
            <td className="list">{store.id}</td>
            <td className="list">{store.name}</td>
        </tr>
    )
}