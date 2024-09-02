import React from "react";
const ItemRow = require("../pagelets/ItemRow").default;
const status = require("../Common.js").checkStatus;

export default  function Municipalities() {

    document.title = "Dagligvare - kommuner";
    const [municipalities, setMunicipalities] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        fetch("/server/kommuner")
            .then(status)
            .then((response) => response.json())
            .then((data) => setMunicipalities(data.message))
            .catch(error => setErrorMsg("Feil ved ping server: " + error)); 
      }, []);

    if (errorMsg)
        return <>{errorMsg}</>
    else
        return (
            <div>
                <h2 align="center">Kommuner</h2> 
                <MunicipalityTable municipalities={municipalities} />
            </div>
        )
}

function MunicipalityTable({ municipalities }) 
{
    const rows = [];

    if (municipalities)
    {
        municipalities.forEach((municipality) => 
        {
            rows.push(<ItemRow item={municipality} key={municipality.id} />);
        });
    }

    return (
        <table align="center">
        <thead>
            <tr>
            <th>KommuneNr</th>
            <th>Kommune</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
    );
}