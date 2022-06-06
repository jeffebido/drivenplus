import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../providers/Auth"; 


export default function Subscriptions() {

    const {user} = useAuth();

    const [planos, setPlanos] = useState([]);

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);

        promise.then(response => {


            
            setPlanos(response.data);

            
            console.log(response.data);
            
        });

     
    }, []);

    return (
        
        <div className="container"> 
            <Header>
                <h1>Escolha seu Plano</h1>
            </Header>
            
            
            
            { planos.map( plano => <Plano> <img src={plano.image} /> <h2>{plano.price}</h2></Plano> ) }
            
            
        </div>
        
    )
}


/* --- STYLES --- */
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 20px;
    h1{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
    }
`;
const Plano = styled.div`
    height: 180px;
    width: 100%;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2{
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`;