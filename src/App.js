import './App.css';
// Importamos los componentes
import Show from './components/show/Show';
import Create from './components/create/Create';
import Edit from './components/edit/Edit';
import NavBar from './components/navBar/Navbar';
import Header from './components/header/Header';
import Inicio from './components/inicio/Inicio';

//Importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Header />
            <div className="container-main overflow-auto">
                <BrowserRouter>
                    <div className="container-fluid py-3 d-flex flex-row justify-content-xl-between align-items-stretch">
                        <div className="titulo"></div>
                        <div
                            className="nav flex-grow-0 h-10 d-flex flex-row justify-content-start align-items-center col-2"
                            style={{ boxSizing: 'border-box' }}
                        >
                            <NavBar />
                        </div>
                        <div className="ml-2 flex-grow-4 container overflow-auto">
                            <Routes>
                                <Route path="/" element={<Inicio />} />
                                <Route path="/Show" element={<Show />} />
                                <Route path="/create" element={<Create />} />
                                <Route path="/edit/:id" element={<Edit />} />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}
export default App;
