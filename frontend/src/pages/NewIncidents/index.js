import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncidents(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    
    

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        await api.post('incidents', data , {
            headers: {
                Authorization: ongId,
            }
        })

        history.push('/profile');
    }
    return (
        <div className="new-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Cadastre um novo Caso</h1>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#f00" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Texto do Caso" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor do Caso" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Criar</button>
                </form>
            </div>
        </div>
    );
}