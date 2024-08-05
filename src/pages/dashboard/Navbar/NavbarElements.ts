import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'


export const Nav = styled.nav`
    background: #F5F5F5;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 100px;
    width: 100vw;
    
@media  (max-width: 566px){
    width: 100%;  
    font-size: 0.5rem;
    background: #F5F5F5;
    display: flex;
    justify-content: space-between;
    margin-right: 0 !important;
}
`

export const NavLink = styled(Link)`
    color: #012A4A;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 32px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: bold;

    &:hover{
        text-decoration: none;
        color: #012A4A
    }

    @media only screen and (max-width: 566px) {
        .text {
            margin-left: -5rem;
        }
    }
   
`

export const StackLink = styled(Link)`
    align-items: center;
    display: flex;
    color: #012A4A;
    
`

export const NameLink = styled(Link)`
    color: #012A4A;
    display: flex;
    font-weight: 500;
    font-size: 16px;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    flex: none;
    order: 1;
    flex-grow: 0;

    &:hover{
        text-decoration: none;
        color: #012A4A
    }
`

export const NavBtn = styled.nav`
    color: #012A4A
    display: flex;
    align-items: center;
    margin-right: 4.16%;
`

export const NavBtnLink = styled(Link)`
       cursor: pointer;
`;




