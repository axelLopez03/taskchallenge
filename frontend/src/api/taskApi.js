import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskListPage } from './pages/TaskListPage';
import './App.css'; // Archivo para estilos básicos

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskListPage />} />
                {/* Aquí podrías agregar futuras rutas, como /edit/:id */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;