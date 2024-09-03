import React from 'react';

/*
  Vises:
  - ved 1. visning
  - ved klikk på "Hjem" i venstre meny (se Layout.js)
*/
export default function Home() 
{
    document.title = "Dagligvare";

    return <h2 align="center">Velkommen til dagligvarehuset 'Mat Til Folket'</h2>;
}