import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
export default function SeatsPage(props) {
    const [footer,Setfooter] = useState(<></>)
    const [seats,Setseats] = useState(<></>)
    const [selected,Setselect] = useState([])

    function seatselecition(id){
        if(selected.indexOf(id) ==-1){
            const newselected = [...selected,id]
            Setselect(newselected)
        }else{
            const newselected = selected.filter((item) => item !== id )
            Setselect(newselected)
        }
        console.log(selected)
    }
    function fconteiner(resposta){
        Setfooter(<FooterContainer>
                <div>
                    <img src={resposta.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{resposta.movie.title}</p>
                    <p>{resposta.day.weekday} - {resposta.name}</p>
                </div>
            </FooterContainer>)
    }
    function seatgenerete(resposta){
        Setseats(resposta.seats.map(
            (seat)=>{
                let Seatcor = ''
                if(selected.indexOf(seat.id) == -1){
                    Seatcor = styled(SeatItem)`
                    background-color: ${seat.isAvailable===false?'#FBE192':'#C3CFD9'};
                    border:${seat.isAvailable===false?'1px solid #F7C52B':'1px solid #808F9D'};
                `
                }else{
                    Seatcor =styled(SeatItem)`
                    background-color:#1AAE9E;
                    border: 3px solid 1px solid #0E7D71;
                    `
                }
                return(
                    <button disabled={seat.isAvailable===false?true:false} onClick={()=>seatselecition(seat.id)}>
                        <Seatcor key={seat.id} data-test="seat"> {seat.name}</Seatcor>
                    </button>
                )
            }
        ))
    }
    function assentos(){
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${props.seatspageid}/seats`)
        promise.then((resposta)=>{fconteiner(resposta.data);seatgenerete(resposta.data);console.log(resposta.data)})
    }
    useEffect(assentos,[selected])
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name"/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf"/>

                <button>Reservar Assento(s)</button>
            </FormContainer>

            {footer}

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    button{
        all: unset;
    }
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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