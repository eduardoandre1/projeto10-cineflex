import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function HomePage (props) {
  function generatemovies () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
    promise.then((respota) => {
      const filmes = respota.data.map((data) => {
        const link = `/sessoes/${data.id}`
        return (
                    <MovieContainer data-test="movie" key={data.id}>
                        <Link to={link} key={data.id}>
                            <img onClick={() => { props.Setchosen(data) }} src={data.posterURL} alt="poster"/>
                        </Link>
                    </MovieContainer>
        )
      })
      props.Setcartaz(filmes)
    })
  }

  useEffect(() => generatemovies(), [])
  return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {props.cartaz}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
