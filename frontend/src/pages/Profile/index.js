import React , { useEffect , useState } from 'react';

import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId])

    function handleDeleteIncident(id){
        try {
            api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch {
            alert('Error ao deletar');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo , {ongName}</span>
                <Link className="button" to="/incidents/new">Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#f00"/>
                </button>
                    
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={16} color="#999" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}