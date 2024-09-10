import React from "react";
import { Outlet } from "react-router-dom";
import MenuItemLeft from "../pagelets/MenuItemLeft";
import ServerInfo from "../pagelets/ServerInfo";

/* Venstre navigasjon 
    MenyItemLeft er opprettet (av Ellen) for å gjenbruke logikk
*/
export default function Layout()
{
    const [selectedItemName, setSelectedItemName] = React.useState("/");
  return (
    <>
        <table>
            <tbody>
            <tr>
                <td valign="top">
                    <nav>
                        <table width="150" cellPadding="5">
                            <tbody>
                                <tr><MenuItemLeft itemName="/" itemText="Hjem" selectedItemName={selectedItemName} setSelectedItemName={setSelectedItemName}/></tr>
                                <tr><MenuItemLeft itemName="/municipalities" itemText="Kommuner" selectedItemName={selectedItemName} setSelectedItemName={setSelectedItemName}/></tr>
                                <tr><MenuItemLeft itemName="/articles" itemText="Varer" selectedItemName={selectedItemName} setSelectedItemName={setSelectedItemName}/></tr>
                                <tr><td><ServerInfo/></td></tr>
                            </tbody>  
                        </table>
                    </nav>
                </td>
                <td width="1200" valign="top">
                    <Outlet />
                </td>
            </tr>
            </tbody>
        </table>
    </>
    )
}