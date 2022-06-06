import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../providers/Auth"; 

import MoneyIcon from '../../img/money.svg';
import ListIcon from '../../img/list.svg';
import ReturnIcon from '../../img/return.svg';
import CloseIcon from '../../img/close.svg';

export default function Subscription() {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const {user, setUser} = useAuth();

    const [showModal, setShowModal] = useState(false);

    const [formNome, setFormNome] = useState("");
    const [formCartao, setFormCartao] = useState("");
    const [formCcv, setFormCcv] = useState("");
    const [formValidade, setFormValidade] = useState("");

    const [plano, setPlano] = useState([]);
    const [perks, setPerks] = useState([]);

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, config);

        promise.then(response => {


            
            setPlano(response.data);
            setPerks(response.data.perks );
            setUser({
                "id": user.id,
                "name": user.name,
                "membership": id,
                "token": user.token
            });
            localStorage.setItem("user", JSON.stringify({
                "id": user.id,
                "name": user.name,
                "membership": id,
                "token": user.token
            }));
        });

     
    }, []);

    function openModal(event){

        event.preventDefault();

        setShowModal(true);
        
    }

    function enviaForm () {

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
            membershipId: id,
            cardName: formNome,
            cardNumber: formCartao,
            securityNumber: formCcv,
            expirationDate: formValidade
		}, config)
        .then( response => {

            navigate("/home");
        } )
        .catch((err) => {

            console.error(err);
            alert("Verifique os dados e tente novamente.");
        });
    }

    return (
        


            plano === null ? (<div className="loading">Carregando...</div>) : (
                

                <>
                    <Header>
                        <Link to={`/subscriptions`}>
                            <img src={ReturnIcon}></img>
                        </Link>
                    </Header>
                    <Logo>
                        <img src={plano.image}></img>
                        <h1>{plano.name}</h1>
                    </Logo>

                    <div className="container">

                    
                        <DescPlano>
                            <h4>
                                <img src={ListIcon} className="icon"/>
                                <span>Benefícios:</span>
                            </h4>

                            
                            
                            { perks.map( item => <p>{item.title == "Solicitar brindes" ? "Brindes Exclusivos" : item.title}</p> ) }
                            

                            <h4 className="pt-20">
                                <img src={MoneyIcon} className="icon"/>
                                <span>Preço:</span>
                            </h4>
                            <p>R$ {plano.price} cobrados mensalmente</p>
                        </DescPlano>

                        <form onSubmit={openModal} className="pt-35">

                            <input type="text" placeholder="Nome impresso no cartão" value={formNome} onChange={e => setFormNome(e.target.value)} className="form-field" required ></input>
                            <input type="number" placeholder="Digitos do cartão" value={formCartao} onChange={e => setFormCartao(e.target.value)} className="form-field" required ></input>
                            
                            <div className="form-2-cols">
                                <input type="number" placeholder="Código de segurança" value={formCcv} onChange={e => setFormCcv(e.target.value)} className="form-field" required ></input>
                                <input type="text" placeholder="Validade" value={formValidade} onChange={e => setFormValidade(e.target.value)} className="form-field" required ></input>
                            </div>

                            
                            <button type="submit" className="btn">ASSINAR</button>
                        </form>

                    </div>
                    <Modal showModal={showModal}>
                        
                        <img src={CloseIcon} className="btn-close" onClick={() => setShowModal(false)} />
                        
                        <div className="modal-box">
                            <div className="content">
                                Tem certeza que deseja assinar o plano <br/>{plano.name} (R$ {plano.price})
                            </div>
                            <div className="buttons">
                                <button className="btn btn-modal btn-gray" onClick={() => setShowModal(false)}>NÃO</button>
                                <button className="btn btn-modal" onClick={() => enviaForm()}>SIM</button>
                            </div>
                        </div>

                    </Modal>
                </>
            )
        
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
const Modal = styled.div`
    display: ${
      props => props.showModal ? "flex" :  "none"
    };
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    align-items: center;
    justify-content: center;
    padding-left: 60px;
    padding-right: 60px;
    
    .modal-box{
        height: 210px;
        width: 100%;
        background-color: #fff;
        border-radius: 12px;
        padding-top: 30px;
        padding-left: 22px;
        padding-right: 22px;
        padding-bottom: 10px;
        .content{
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: #000000;
        }
        .buttons{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 50px;
        }
    }
    .btn-close{
        cursor: pointer;
        position: absolute;
        top: 25px;
        right: 20px;
    }
`;