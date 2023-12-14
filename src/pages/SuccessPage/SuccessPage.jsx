import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function SuccessPage (props) {
  const dataBase = genereterResultPage(props.chosen)
  const seatsReservetion = seats(props.assentosnome)
  const dataClient = client(props.client)
  return (
        <PageContainer>
            {dataBase}
            {seatsReservetion}
            {dataClient}
            <Link data-test="go-home-btn" to="/">Voltar para Home</Link>
        </PageContainer>
  )
}
function seats (name) {
    return (
        <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {name.map((name) => { return (<p>Assento {name}</p>) })}
        </TextContainer>
    )
  }
function client (client) {
    return (
            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {client.name}</p>
                <p>CPF: {client.cpf}</p>
            </TextContainer>
    )
  }
function genereterResultPage (apiRespost) {
    return (
            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{apiRespost.movie.title}</p>
                <p>{apiRespost.day.date} - {apiRespost.name}</p>
            </TextContainer>
    )
  }

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`
