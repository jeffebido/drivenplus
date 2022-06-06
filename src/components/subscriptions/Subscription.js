import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../providers/Auth"; 

import MoneyIcon from '../../img/money.svg';
import ListIcon from '../../img/list.svg';
import ReturnIcon from '../../img/return.svg';
import LogoImg from '../../img/logo-driven-plus.svg';

export default function Subscription() {
    
    const { id } = useParams();

    const [formNome, setFormNome] = useState("");
    const [formCartao, setFormCartao] = useState("");
    const [formCcv, setFormCcv] = useState("");
    const [formValidade, setFormValidade] = useState("");


    function enviaForm (event) {

        event.preventDefault();

        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
            
		})
        .then( response => {

            
            //console.log(response.data);
        } )
        .catch((err) => {

            console.error(err);
            alert("Usuário ou senha incorreta!");
        });
    }

    return (

        <>  
            <Header>
                <Link to={`/subscriptions`}>
                    <img src={ReturnIcon}></img>
                </Link>
            </Header>

            <Logo>
                <img src={LogoImg}></img>
                <h1>Driven Plus</h1>
            </Logo>

            <div className="container">

            
                <DescPlano>
                    <h4>
                        <img src={ListIcon} className="icon"/>
                        <span>Benefícios:</span>
                    </h4>
                    <p>1. Brindes exclusivos</p>
                    <p>2. Materiais bônus de web</p>

                    <h4 className="pt-20">
                        <img src={MoneyIcon} className="icon"/>
                        <span>Preço:</span>
                    </h4>
                    <p>R$ 39,99 cobrados mensalmente</p>
                </DescPlano>

                <form onSubmit={enviaForm} className="pt-35">

                    <input type="text" placeholder="Nome impresso no cartão" value={formNome} onChange={e => setFormNome(e.target.value)} className="form-field" required ></input>
                    <input type="number" placeholder="Digitos do cartão" value={formCartao} onChange={e => setFormCartao(e.target.value)} className="form-field" required ></input>
                    
                    <div className="form-2-cols">
                        <input type="number" placeholder="Código de segurança" value={formCcv} onChange={e => setFormCcv(e.target.value)} className="form-field" required ></input>
                        <input type="text" placeholder="Validade" value={formValidade} onChange={e => setFormValidade(e.target.value)} className="form-field" required ></input>
                    </div>

                    
                    <button type="submit" className="btn">ASSINAR</button>
                </form>

            </div>
            
        </>
    );
}
const Header = styled.div`
	width: 100%;
    padding: 25px;
`;
const Logo = styled.div`
	display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin-top: 10px;
    }
`;
const DescPlano = styled.div`
	
    h4{
        margin-bottom: 10px;
        span{
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #FFFFFF;
            margin-left: 5px;
        }
    }
    p{
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
        margin-bottom: 5px;
    }
`;