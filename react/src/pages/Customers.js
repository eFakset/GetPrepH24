import React from "react";
const Item = require("../Common.js").Item;
const status = require("../Common.js").checkStatus;
import NewImg from '../../public/NewData.gif';
import DeleteImg from '../../public/delete.gif';
import EditImg from '../../public/Draw.gif';

export default function CustomerPage() {

    document.title = "Dagligvare - kunder";
    
    return <div><h2 align="center">Kunder</h2>{<Customers/>}</div>
}

function Customers() 
{
// changeFlg får ny verdi når det er gjort endring i data -> alle kunder hentes på nytt (ikke optimalt)
    const [changeflg, setChangedflg] = React.useState(0);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [customers, setCustomers] = React.useState(null);

    React.useEffect(() =>
	{
        fetch("/server/kunder")
            .then(status)
            .then((response) => response.json())
            .then((data) => setCustomers(data.message))
            .catch(error => setErrorMsg("Feil ved les kunder: " + error)); 
    }, [changeflg]);

    return <CustomerTable customers={customers} changeflg={changeflg} setChangedflg={setChangedflg} errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
}  

function CustomerTable({ customers, changeflg, setChangedflg, errorMsg, setErrorMsg })
{
// Toggle disabled for å stenge buttons når de ikke skal kunne trykkes på    
    const [disabled, setDisabled] = React.useState(true);

    var rows = [];
    if (customers)
    {
        customers.forEach((customer) => 
        {
            rows.push(<CustomerRow customer={customer} key={customer.id} disabled={disabled} setDisabled={setDisabled} changeflg={changeflg} setChangedflg={setChangedflg}/>);
        });
    }

    return (
        <form>
            <EditRow disabled={disabled} setDisabled={setDisabled} changeflg={changeflg} setChangedflg={setChangedflg} errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
            <p></p>
            <table align="center">
                <thead>
                    <tr>
                        <th className="list">Fylke</th>
                        <th className="list">Kommune</th>
                        <th className="list">Kunde</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </form>
    );
}

function EditRow({disabled, setDisabled, changeflg, setChangedflg, errorMsg, setErrorMsg})
{
    const [municipalities, setMunicipalities] = React.useState(null);

    React.useEffect(() =>
	{
        fetch("/server/kommuner")
            .then(status)
            .then((response) => response.json())
            .then((municipalities) => setMunicipalities(municipalities.message))
            .catch(error => setErrorMsg("Feil ved les kommuner: " + error)); 
    }, []);

    const errorStyle = 
    {
        color: 'red',
        lineHeight: 3,
    }

    return (
        <div align="center">
            <NewBn disabled={disabled} setDisabled={setDisabled}/>
            <input type="hidden" id="custid"/>
            <label htmlFor="custname">   Kundenavn: </label> 
            <input id="custname" name="custname" type="text" disabled={disabled}/>
            <MunicipalityCb municipalities={municipalities} disabled={disabled} />
            <OKBn disabled={disabled} setDisabled={setDisabled} changeflg={changeflg} setChangedflg={setChangedflg} setErrorMsg={setErrorMsg}/>
            <CancelBn disabled={disabled} setDisabled={setDisabled}/>
            <br/><div style={errorStyle}>{errorMsg}</div>
        </div>
    )
}

function MunicipalityCb({municipalities, disabled})
{
    const options = [];
    let defaultMunicipality = new Item("0000", "...");
    options.push(<MunicipalityOption municipality={defaultMunicipality} key={defaultMunicipality.id}/>);  

    if (municipalities)
    {
        municipalities.forEach((JSONMunicipality) =>
        {
            let municipality = new Item(JSONMunicipality.id, JSONMunicipality.name);
            options.push(<MunicipalityOption municipality={municipality} key={municipality.id}/>);   
        });
    }

    return (
        <span> 
            <label htmlFor="municb">  Kommune:  </label>
            <select id="municb" disabled={disabled}>
                {options}
            </select>
        </span>
    )
}
 
function MunicipalityOption({municipality})
{
    return <option id={municipality.id}>{municipality.name}</option>
}

function NewBn({disabled, setDisabled})
{
    var handleNew = (event) =>
    {
        event.preventDefault(); 
        document.getElementById("custid").value = -1;
        setDisabled(!disabled);
    }

    let newDisabled = !disabled;

    return (
        <button id="newBn" onClick={handleNew} disabled={newDisabled}>
            <img src={NewImg} alt="Ny kunde" width="15" height="15"/>
        </button>
    )
}

function OKBn({disabled, setDisabled, changeflg, setChangedflg, setErrorMsg})
{
    var handleOK = (event) =>
    {

        event.preventDefault(); 

        let customerId = document.getElementById("custid").value;
// Hvis ny kunde: customerId = -1        
        let action = customerId < 0 ? "/nykunde" : "/oppdaterkunde";

        let customerName = document.getElementById("custname").value;
        let selMunicipality = document.getElementById("municb");
        let municipalityIdx = selMunicipality.selectedIndex;

        if (customerName == null || customerName === "")
        {
            alert("Kundenavn må fylles ut!");
            return;
        }

        if (municipalityIdx < 1)
        {
            alert("Kommune må velges!");
            return;
        }
// Bygger JSON-struktur -> body i request mot server          
        var params = '{"Customer":{"customerId":"' + customerId + '", "customerName":"' + customerName + '", "municipalityNo":"' + selMunicipality.options[municipalityIdx].id + '"}}';
// Angir at content er på JSON-format
        fetch("/server" + action,
            { 
                method: "PUT",
                headers: {
                        "content-type":"application/json"
                        ,"accept":"application/json"
                        },
                body: params
            })
           .then(status)
           .then(response => response.json())
           .then(data => {
                let newChangeFlag = changeflg + 1;
                changeflg = newChangeFlag;
                setChangedflg(changeflg);
                document.getElementById("custname").value = "";
                document.getElementById("municb").selectedIndex = 0;
            })
           .catch(error => setErrorMsg("Feil ved oppdatering av kunde: " + error)); 
  
        setDisabled(!disabled);
    }

    return (
        <span>
            <button id="okBn" onClick={handleOK} disabled={disabled}>
                Lagre
            </button>
        </span>
    )
}

function CancelBn({disabled, setDisabled})
{
    var handleCancel = (event) =>
    {
        event.preventDefault(); 

        document.getElementById("custname").value = "";
        document.getElementById("municb").selectedIndex = 0;

        setDisabled(!disabled);
    }

    return (
        <span>
            <button id="cancelBn" onClick={handleCancel} disabled={disabled}>
                Avbryt
            </button>
        </span>
    )
}

function EditBn({customer, disabled, setDisabled})
{
    var handleEdit = (event) =>
    {
        event.preventDefault();

        if (!disabled)
            return;

        document.getElementById("custid").value = customer.id;
        document.getElementById("custname").value = customer.name;
        document.getElementById("municb").value = customer.municipalityName;

        setDisabled(!disabled);
    }   

    return (
        <button id="editBn" type="button" onClick={handleEdit}>
            <img src={EditImg} alt="Oppdaterer" width="15" height="15"/>
        </button>
    )
}

function DeleteBn({customer, changeflg, setChangedflg})
{
    var handleDelete = (event) =>
    {
        event.preventDefault();

        var params = '{"custid":"' + customer.id + '"}';

        fetch('/server/slettkunde', 
            { 
                method: "DELETE",
                headers: {
                        "content-type":"application/json"
                        ,"accept":"application/json"
                        },
                body: params
            })
           .then(status) 
           .then(response => response.json())
           .then(data => {
                let newChangeFlag = changeflg + 1;
                changeflg = newChangeFlag;
                setChangedflg(changeflg);
            })
           .catch(error => setErrorMsg("Feil ved sletting av kunde: " + error)); 
           ;
    }   

    let disabled = !customer.isDeletable;

    return (
        <button id="deleteBn" type="button" onClick={handleDelete} disabled={disabled}>
            <img src={DeleteImg} alt="Sletter" width="15" height="15"/>
        </button>
    )
}

function CustomerRow ({customer, disabled, setDisabled, changeflg, setChangedflg})
{
    return (
        <tr className="list">
            <td>{customer.countyName}</td>
            <td>{customer.municipalityName}</td>
            <td>{customer.name}</td>
            <td align="center"><DeleteBn customer={customer} changeflg={changeflg} setChangedflg={setChangedflg}/></td>
            <td align="center"><EditBn customer={customer} disabled={disabled} setDisabled={setDisabled}/></td>
        </tr>
    )
}