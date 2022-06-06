import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../providers/Auth"; 

import UserAvatar from '../../img/user-avatar.svg';

export default function Home() {

    const navigate = useNavigate();
    const {user} = useAuth();

    const [plano, setPlano] = useState([]);
    const [perks, setPerks] = useState([]);

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${user.membership}`, config);

        promise.then(response => {

            setPlano(response.data);
            
            setPerks(response.data.perks );
            //console.log(response.data.perks);
        });

     
    }, []);
    
    function cancelaPlano(){
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        axios.delete(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, config);
        navigate("/subscriptions");
    }

    return (
        
        plano === null ? (<div className="loading">Carregando...</div>) : (
                

            <>
                <Header>
                    <Logo src={plano.image} />
                    <Avatar src={UserAvatar}/>
                </Header>

                <Hello>
                    Olá, {user.name}
                </Hello>

                <div class="container">
                    { perks.map( item => <a href={item.link} className="btn mt-10" target="_blank"> {item.title} </a> ) }

                    <Footer>
                        <Link to={`/subscriptions`} className="btn">Mudar plano</Link>
                        <button className="btn danger mt-10" onClick={() => cancelaPlano()}>Cancelar plano</button>
                    </Footer>
                </div>
            </>
        )
        
    )
}

const Header = styled.div`
	width: 100%;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    padding: 22px;
`;
const Logo = styled.img`
	height: 50px;
    margin-left: 16px;
    margin-top: 10px;
`;
const Avatar = styled.img`
	height: 35px;
`;
const Hello = styled.div`
	width: 100%;
    display: flex;
    justify-content: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    padding-bottom: 50px;
`;
const Footer = styled.div`
	position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 12px;
    width: 100%;
`;