import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {FirebaseContext }from "../../firebase";
import Platillo from "../ui/Platillo"

const Menu = () => {

    const { firebase} = useContext(FirebaseContext)
    const [platillos, guardarPlatillos] = useState([]);
    useEffect(() => {
        const obtenerProductos = async () => {
          firebase.db.collection("productos").onSnapshot(handleSnapshot)
          

            /* asi seria traer los resultados no en realtime
            const resultado =  await firebase.db.collection("productos").get()
            resultado.forEach(element => {
                console.log(element.data())
            });
            */
        }
        obtenerProductos()
    }, [])

    function handleSnapshot(snapshot) {
        const platillos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        guardarPlatillos(platillos)
    }
    return ( 
        <>

            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/nuevo-platillo" className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Platillo
            </Link>

            {platillos.map(platillo => (
                <Platillo key={platillo.id} platillo={platillo} />
            ))}

        </>
     );
}
 
export default Menu;