import React from 'react';

const Demo = () =>
{
    document.title = "Demo React";

// Hook: setServerInfo([arg]), resultat: serverInfo     
    const [serverInfo, setServerInfo] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const status = response =>
    {
        if (response.status >= 200 && response.status < 300)
        {
            return Promise.resolve(response)
        }
        return Promise.reject(new Error(response.statusText + ", http error " + response.status))
    }    

/* Henter serverinfo: prefiks /server -> leter etter http:localhost:3001/ping (se webpack.config.js) 
   Kaller status   
   Hvis status != Error -> response.json() -> setServerInfo()
   Hvis status == Error -> kaller setErrorMsg()
*/     
    React.useEffect(() => {
        fetch("/server/ping")
            .then(status)
            .then((response) => response.json())
            .then((data) => setServerInfo(data.message))
            .catch(error => setErrorMsg("Feil ved ping server: " + error))
    }, []);

// HTML bygges med serverInfo, resultatet av setServerInfo
// Ellers vises errorMsg

    if (serverInfo)
        return (
            <>
                <h2>Demo React</h2>
                <table cellPadding="5">
                    <thead>
                        <tr>
                            <th>Node.js prosjekt</th>
                            <th>Server port</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{serverInfo.ServerInfo.source}</td>
                            <td>{serverInfo.ServerInfo.port}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    else
        return <>{errorMsg}</>
};
export default Demo;