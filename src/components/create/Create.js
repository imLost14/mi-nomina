 import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection,addDoc, getDocs } from 'firebase/firestore'
import {db} from '../../firebaseConfig/firebase';
import Select from 'react-select';
import './create.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const Create = () => {
const [nombre,setNombre]=useState('');
const [edad,setEdad]=useState(0);
const [salario_devengado,setSalario_devengado]=useState(0);
const [dias_liquidados,setDias_liquidados]=useState(0);
const [cargos,setCargos]=useState([]);
const [cargoSeleccionado,setCargoSeleccionado]=useState('');

const getCargos = async () => {
            const data = await getDocs(cargosCollection);

            
          const cargosArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setCargos(cargosArray);
        }


const navigate=useNavigate();
const empleadosCollection=collection(db,"empleados");

const cargosCollection = collection(db, "cargos");

useEffect(()=>{
  getCargos();
},[ ]);

// Funcion para almacenar
const store= async (e)=>{
  e.preventDefault();
  await addDoc(empleadosCollection,{
    fld_nombre:nombre,
    fld_edad:edad,
    fld_salario_devengado:salario_devengado,
    fld_dias_liquidados:dias_liquidados,
    fld_cargo: cargoSeleccionado ? cargoSeleccionado.value : null
  })
  MySwal.fire({
        title: 'Registro Creado',
        text: 'El registro ha sido editado con éxito',
        icon: 'success'
      })
    

  navigate('/Show')  // para ir a la ruta raiz y nos muestra el componente Show
}

const opciones = cargos.map((cargo) => ({ value: cargo.id, label: cargo.fld_nombre }));
  return (
    <div className="container create">
      <div className="row">
            <div className="col">
              <h3>Crear Registro de empleado</h3>
              <form onSubmit={store}>
                    <div className="mb-3">
                          <div className="form-label">Nombre</div>
                          <input 
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                            type='text'
                            className='form-control'
                          />
                    </div>

                    <div className="mb-3">
                          <div className="form-label">Edad</div>
                          <input 
                            value={edad}
                            onChange={(e)=>setEdad(e.target.value)}
                            type='number'
                            className='form-control'
                          />

                    </div>
                    <div className="mb-3">
                          <div className="form-label">salario devengado</div>
                          <input 
                            value={salario_devengado}
                            onChange={(e)=>setSalario_devengado(e.target.value)}
                            type='number'
                            className='form-control'
                          />
                    </div>
                    <div className="mb-3">
                          <div className="form-label">dias liquidados</div>
                          <input 
                            value={dias_liquidados}
                            onChange={(e)=>setDias_liquidados(e.target.value)}
                            type='number'
                            className='form-control'
                          />
                    </div>
                    
                   
                    <div className="mb-3">
                      <div className="form-label">Cargos</div>
                      <Select
                        value={cargoSeleccionado}
                        onChange={setCargoSeleccionado}
                        className='form-control'
                        options={opciones}
                        placeholder= "Seleccione una cargo"
                      />
                    </div>

                    <button type='submit' className='btn btn-primary'>Almacenar</button>

              </form>
            </div>
      </div>
    </div>
  )
}

export default Create