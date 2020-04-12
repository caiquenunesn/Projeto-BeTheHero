import React , { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css'
import ImgBe from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function (){
    const [id , setId] = useState('');
    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();
        try {
            const res = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);

            history.push('/profile');

        } catch (err){
            alert('Err')
        }
    }

    return (
        <div className="dpseumudo">
            <section className="calma">
                <img src={logoimg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                
                     <Link className="back-link" to="/register">
                    <FiLogIn size={15} color="#f00" />
                        Não Tenho uma conta
                    </Link>
                    
                </form>
                

            </section>

            <img src={ImgBe} alt="Heroes"/>
        </div>
    );
}