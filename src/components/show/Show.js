// React, Hooks => funciones que controlan el estado de una componente
import React, { useState, useEffect } from 'react';
// Links => Reemplazar <a>
import { Link, Links } from 'react-router-dom';

// Se refiere al manejo de la base de datos
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
// Importamos el objeto o constante que conecta la base de datos
import { db } from '../../firebaseConfig/firebase';

import './show.css';

// Se usan para poder implementar el sweetalert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Show = () => {
    //1. Configuramos los hooks
    const [empleados, setEmpleados] = useState([]); // Con un arreglo vacío

    //2. Referenciamos a la BD
    const empleadosCollection = collection(db, 'empleados');

    const [cargos, setCargos] = useState([]); // Para almacenar las cargos

    const getCargos = async () => {
        const cargosCollection = collection(db, 'cargos');
        const data = await getDocs(cargosCollection);

        setCargos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    //3. Funcion para mostrar todos los Docs
    const getEmpleados = async () => {
        const data = await getDocs(empleadosCollection);
        // console.log(data.docs);
        setEmpleados(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // Mostrasmo el arreglo producs del useState
        // console.log(empleados);
    };
    //4. Funcionar vpara eliminar un doc
    const deleteEmpleado = async (id) => {
        const empleadoDoc = doc(db, 'empleados', id);
        await deleteDoc(empleadoDoc);
        getEmpleados(); //Para mostrar toda la tabla despues de eliminar
    };
    //5. Funcion de confirmacion para SweetAlert
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Esta Seguro?',
            text: 'Esta operación es irreversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminalo!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmpleado(id);
                Swal.fire({
                    title: 'Eliminado!!!',
                    text: 'Su registro ha sido eliminado.',
                    icon: 'success',
                });
            }
        });
    };

    //6. Usamo useEfect

    useEffect(() => {
        getEmpleados();
        getCargos();
        //esLint-disable-next-Line
    }, []);

    //7.  Retrornamos la vista del componente
    return (
        <>
            <div className="container show">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table table-light table-hover show-table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Edad</th>
                                        <th>salario devengado</th>
                                        <th>dias liquidados</th>
                                        <th>Cargo</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {empleados.map((empleado) => {
                                        // Busca la marca correspondiente usando el ID de la marca
                                        const cargo = cargos.find((m) => m.id === empleado.fld_cargo); // Asegúrate de que 'marcaId' sea el campo correcto en tu documento de empleado

                                        return (
                                            <tr key={empleado.id}>
                                                <td>{empleado.fld_nombre}</td>
                                                <td>{empleado.fld_edad}</td>
                                                <td>{empleado.fld_salario_devengado}</td>
                                                <td>{empleado.fld_dias_liquidados}</td>
                                                <td>{cargo ? cargo.fld_nombre : 'Sin marca'}</td>{' '}
                                                {/* Muestra el nombre del cargo */}
                                                <td>
                                                    <Link to={`/edit/${empleado.id}`} className="btn btn-light m-2">
                                                        <i className="fa-solid fa-pencil"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(empleado.id)}
                                                        className="btn btn-danger m-2"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
