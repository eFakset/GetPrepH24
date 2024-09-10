import React from "react";
const ItemRow = require("../pagelets/ItemRow").default;
const status = require("../Common.js").checkStatus;

export default function Municipalities() {

    document.title = "Dagligvare - kommuner";
// Hook: setMunicipalities([arg]), resultat: municipalities     
    const [municipalities, setMunicipalities] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

/* Henter kommuner: prefiks /server -> leter etter http:localhost:3001/kommuner (se webpack.config.js) 
   Kaller status (Common.js.checkStatus)  
   Hvis status != Error -> response.json() -> setMunicipalities()
   Hvis status == Error -> kaller setErrorMsg()
*/     
    React.useEffect(() => {
        fetch("/server/kommuner")
            .then(status)
            .then((response) => response.json())
            .then((data) => setMunicipalities(data.message))
            .catch(error => setErrorMsg("Feil ved les kommuner: " + error)); 
      }, []);
// Returnerer HTML (for Outlet, se Layout.js)      
// Hvis errorMsg er utfylt, skal den vises, ellers kommunetabell med heading
// MunicipalityTable bygges med municipalities, resultatet av setMunicipalities
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

// Bygger kommunetabell
function MunicipalityTable({ municipalities }) 
{
    const rows = [];

// Løper gjennom municipalities    
    if (municipalities)
    {
        municipalities.forEach((municipality) => 
        {
// Bygger en ItemRow (i ItemRow.js) og legger til i array rows            
            rows.push(<ItemRow item={municipality} key={municipality.id} />);
        });
    }

// Returnerer hele tabellen, med heading og rows
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