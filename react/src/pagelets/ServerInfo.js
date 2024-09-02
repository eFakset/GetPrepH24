import React from "react";
const status = require("../Common.js").checkStatus;

export default function ServerInfo() 
{
    const [serverData, setServerData] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() =>
	{
        fetch("/server/ping")
            .then(status)
            .then((response) => response.json())
            .then((data) => setServerData(data.message.ServerInfo))
            .catch(error => setErrorMsg("Feil ved les av kommuner: " + error)); 
    }, []);

    if (errorMsg)
        return <>{errorMsg}</>
    else if (serverData)
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>Kilde:</td>
                            <td>{serverData.source}</td>
                        </tr>
                        <tr>
                            <td>Port:</td>
                            <td>{serverData.port}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    else
        return <></>
}