import React from 'react';

const Demo = () =>
{
    document.title = "Demo React";

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

    React.useEffect(() => {
        fetch("/server/ping")
            .then(status)
            .then((response) => response.json())
            .then((data) => setServerInfo(data.message))
            .catch(error => setErrorMsg("Feil ved ping server: " + error))
    }, []);

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