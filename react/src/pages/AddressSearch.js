import React from "react";
const status = require("../Common.js").checkStatus;

export default function Municipalities() 
{
    document.title = "Dagligvare - adressesøk";

// Default filter = Get Academy    
    const [filter, setFilter] = React.useState("?fuzzy=false&asciiKompatibel=true&treffPerSide=40&adressenavn=torget&nummer=3");
    const [addresses, setAddresses] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        fetch("https://ws.geonorge.no/adresser/v1/sok" + filter)
            .then(status)
            .then((response) => response.json())
            .then((data) => setAddresses(data.adresser))
            .catch(error => setErrorMsg("Feil ved oppslag adresser: " + error)); 
    }, [filter]);


    var handleClick = (event) =>
    {
        event.preventDefault(); 

        const streetNm = document.getElementById("streetNm").value;
        if (!streetNm)
        {
            alert("Vei/gatenavn må oppgis");
            return;
        }
        const houseNo = document.getElementById("houseNo").value;
        if (!houseNo)
        {
            alert("Gatenummer må oppgis");
            return;
        }

// Bygger filter        
        let newFilter = "?fuzzy=false&asciiKompatibel=true&treffPerSide=40&adressenavn=" + streetNm + "&nummer=" + houseNo;
        const houseLetter = document.getElementById("houseLetter").value;
        if (houseLetter)
            newFilter = newFilter + "&bokstav=" + houseLetter;
// setFilter -> React.useEffect oppdager ny verdi -> API kalles på nytt
        setFilter(newFilter);
    }

    return (
        <table>
            <tbody>
            <tr>
                <td><label htmlFor="streetNm">Gate/veinavn</label></td>
                <td><input type="text" id="streetNm" defaultValue="torget"/></td>
            </tr>
            <tr>
                <td><label htmlFor="houseNo">Husnummer</label></td>
                <td><input type="text" id="houseNo" defaultValue="3"/></td>
            </tr>
            <tr>
                <td><label htmlFor="houseLetter">Bokstav</label></td>
                <td><input type="text" id="houseLetter"/></td>
            </tr>
            <tr><td><button id="searchBn" onClick={handleClick}>Søk</button></td></tr>
            <tr><td colSpan="2">{errorMsg}</td></tr>
            <tr><td colSpan="2"><AddressTable addresses={addresses}/></td></tr>
            </tbody>
        </table>
    )
}

function AddressTable({addresses})
{
    const options = [];

    if (addresses)
    {
// Bruker idx for å sikre unik key
        let idx = 0;
        addresses.forEach((address) => 
        {
            options.push(<AddressOption item={address} key={idx} />);
            idx++;
        });
    }
// Viser inntil 15 i “liste”    
        return (
        <select size="15">
            {options}
        </select>
    )
}

function AddressOption({item})
{
    return <option>{item.adressetekst + " " + item.kommunenummer + " " + item.kommunenavn}</option>
}