import styled from "styled-components"
import axios from "axios"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export default function SessionsPage(props) {
    function FContainer(resposta){
        props.SetFooter(
            <FooterContainer>
                <div data-test="footer">
                    <img src={resposta.posterURL} alt="poster" />
                </div>
                <div data-test="footer">
                    <p>{resposta.title}</p>
                </div>
            </FooterContainer>
        )
    }
    function SContainer(resposta){
        const season =resposta.days.map((days)=>
        {   const link = `/assentos/${days.id}`
            return(
            <SessionContainer key={days.id}>
                        {days.weekday} - {days.date}
                    <Link to={link} key={days.id}>
                    <ButtonsContainer >
                        {days.showtimes.map((data)=>{return(<button onClick={()=>{props.Setseatspageid(data.id)}} key={data.id}>{data.name}</button>)})}
                    </ButtonsContainer>
                    </Link>
            </SessionContainer>
        )
        }
        )
        props.Setsessions(season)
    }
    function sessões(){
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${props.chosen.id}/showtimes`)
        promise.then((respota)=>{FContainer(respota.data);SContainer(respota.data)})
        promise.catch(()=>{console.log('erro')})
    }
    useEffect(sessões,[])
    return (
        <PageContainer>
            Selecione o horário
            <div>
            {props.sessions}
            </div>
            {props.Footer}

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
    a{
        all: unset;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        text-decoration: none
    }
    Link {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`