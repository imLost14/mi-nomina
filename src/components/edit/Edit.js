import React,{useEffect,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { getDoc,updateDoc,doc, collection, getDocs } from 'firebase/firestore';
import {db} from "../../firebaseConfig/firebase";
import Select from 'react-select';
import './edit.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const Edit = () => {
  const [nombre,setNombre]=useState('');
  const [edad,setEdad]=useState(0);
  const [salario_devengado,setSalario_devengado]=useState(0);
  const [dias_liquidados,setDias_liquidados]=useState(0);
  const [cargos,setCargos]=useState([]);
  const [cargoSeleccionado,setCargo_seleccionado]=useState(null);
  const navigate=useNavigate();
  const {id}=useParams();

  const getCargos = async () => {
            const data = await getDocs(cargosCollection);

            
          const cargosArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setCargos(cargosArray);
        }

  const cargosCollection = collection(db, "cargos");


  useEffect(()=> {
    getCargos()
  },[ ])

  const update=async(e)=>{
      e.preventDefault();
      const empleado=doc(db,"empleados",id);
      const data={fld_nombre:nombre,
        fld_edad:edad,
        fld_salario_devengado:salario_devengado,
        fld_dias_liquidados:dias_liquidados,
        fld_cargo: cargoSeleccionado ? cargoSeleccionado.value : null
      };
                             
      await updateDoc(empleado,data);
      MySwal.fire({
        title: 'Registro editado',
        text: 'El registro ha sido editado con éxito',
        icon: 'success'
      })
      navigate("/Show");
  }

  const getProductsById=async (id)=>{
      const empleado=await getDoc(doc(db,"empleados",id))
      if (empleado.exists()){
          setNombre(empleado.data().fld_nombre);
          setEdad(empleado.data().fld_edad);
          setSalario_devengado(empleado.data().fld_salario_devengado);
          setDias_liquidados(empleado.data().fld_dias_liquidados);
          const cargoEncontrado = cargos.find(cargo => cargo.id === empleado.data().fld_marca);
          setCargo_seleccionado(cargoEncontrado ? { value: cargoEncontrado.id, label: cargoEncontrado.nombre } : null);
         //console.log(empleado.data);
      } else {
        // Colocar el sweetaler que diga "Empleado no existe"
        console.log("Empleado no existe");
      }
  }
  useEffect(()=>{
    getProductsById(id);
    //esLint-disable-next-Line
  },[id, cargos])

  const opciones = cargos.map((cargo) => ({ value: cargo.id, label: cargo.fld_nombre }));

  return (
    <div className="container edit">
      <div className="row">
            <div className="col">
              <h3>Editar Empleado</h3>
              <form onSubmit={update}>
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
                          <div className="form-label">Salario devengado</div>
                          <input 
                            value={salario_devengado}
                            onChange={(e)=>setSalario_devengado(e.target.value)}
                            type='number'
                            className='form-control'
                          />
                    </div>

                    <div className="mb-3">
                          <div className="form-label">Dias liquidados</div>
                          <input 
                            value={dias_liquidados}
                            onChange={(e)=>setDias_liquidados(e.target.value)}
                            type='number'
                            className='form-control'
                          />
                    </div>

                     <div className="mb-3">
                      <div className="form-label">Cargo</div>
                      <Select
                        value={cargoSeleccionado}
                        onChange={setCargo_seleccionado}
                        className='form-control'
                        options={opciones}
                        placeholder= "Seleccione una cargo"
                      />
                    </div>


                    <button type='submit' className='btn btn-primary'>Modificar</button>

              </form>
            </div>
      </div>
    </div>
  )
} 
export default Edit