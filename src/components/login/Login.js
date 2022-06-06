import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../providers/Auth"; 

import Logo from '../../img/logo-driven.svg';

export default function Login() {

    const navigate = useNavigate();
    const {setUser} = useAuth([]);

    const [formEmail, setFormEmail] = useState("");
    const [formSenha, setFormSenha] = useState("");

   

    function enviaForm (event) {

        event.preventDefault();

        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
            email: formEmail,
            password: formSenha
		})
        .then( response => {

            setUser({
                "id": response.data.id,
                "name": response.data.name,
                "membership": response.data.membership ? response.data.membership.id : null,
                "token": response.data.token
            });//Salva dados no Contexto

            localStorage.setItem("user", JSON.stringify({
                "id": response.data.id,
                "name": response.data.name,
                "membership": response.data.membership ? response.data.membership.id : null,
                "token": response.data.token
            }));

            if(!response.data.membership){//Verifica se usuário não possui plano

                navigate("/subscriptions");//Não possui plano
            }else{
                navigate("/home");//Possui plano
            }
            //console.log(response.data);
        } )
        .catch((err) => {

            console.error(err);
            alert("Usuário ou senha incorreta!");
        });
    }

    return (
        
        <>  
            <Container>
                <Header>
                    <img src={Logo} />
                </Header>
                <form onSubmit={enviaForm}>
                    <input type="email" placeholder="E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="form-field" required ></input>
                    <input type="password" placeholder="Senha" value={formSenha} onChange={e => setFormSenha(e.target.value)} className="form-field" required ></input>
                    
                    <button type="submit" className="btn">ENTRAR</button>
                </form>
                <Footer >
                    <Link to={`/sign-up`} >
                        Não tem uma conta? Cadastre-se!
                    </Link>
                </Footer>
            </Container>
            
        </>
        
    )
}



/* --- STYLES --- */
const Container = styled.div`
	width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
	background: #0E0E13;
    padding-left: 40px;
    padding-right: 40px;
`;
const Header = styled.div`
    
    padding-bottom: 100px;
    img{
        margin: 0 auto;
    }
`;
const Footer = styled.div`
    padding-top: 25px;
    a{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        text-decoration-line: underline;
        color: #fff;
        cursor: pointer;
    }
`;