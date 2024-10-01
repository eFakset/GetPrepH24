// Felles funksjonalitet
export function checkStatus(response)
{
    if (response.status >= 200 && response.status < 300) 
        return Promise.resolve(response)
    return Promise.reject(new Error(response.status + " / " + response.statusText))
} 

export class Item
{
    constructor(id, name, isDeletable)
    {
        this._id = id;
        this._name = name;
        this._isDeletable = isDeletable;
    }

    get id()
    {
        return this._id;
    }

    get name()
    {
        return this._name;
    }

    get isDeletable()
    {
        return this._isDeletable;
    }
}