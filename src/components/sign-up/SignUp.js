import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function SignUp() {

    const navigate = useNavigate();
    
    const [formNome, setFormNome] = useState("");
    const [formCpf, setFormCpf] = useState(""); 
    const [formEmail, setFormEmail] = useState("");
    const [formSenha, setFormSenha] = useState("");
    
    function enviaForm (event) {
		event.preventDefault();
        
        
        

		axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", {
            email: formEmail,
            name: formNome,
            cpf: formCpf,
            password: formSenha
		})
        .then( response => {
            
            navigate("/");
        } )
        .catch((err) => {

            console.error(err);
            alert("Dados inválidos!");
            
        });
	}

    return (
        
        <Container>
           
            <form  onSubmit={enviaForm}>

                <input type="text" placeholder="Nome" value={formNome} onChange={e => setFormNome(e.target.value)} className="form-field" required ></input>
                <input type="text" placeholder="CPF" value={formCpf} onChange={e => setFormCpf(e.target.value)} className="form-field" required ></input>
                <input type="email" placeholder="E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="form-field" required ></input>
                <input type="password" placeholder="Senha" value={formSenha} onChange={e => setFormSenha(e.target.value)} className="form-field" required ></input>

                <button type="submit" className="btn">CADASTRAR</button>
            </form>
            <Footer className="flex-center">
                <Link to={`/`} >
                    Já tem uma conta? Faça login!
                </Link>
            </Footer>
        </Container>
        
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