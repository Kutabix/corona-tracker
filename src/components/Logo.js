import React from 'react';
import styled from 'styled-components';
import logo from '../images/cov-logo.png';

const Container = styled.div`
    text-align: center;
    display: inline-block;
`

const Img = styled.img`
    max-width: 25px;
    max-height: 25px;
`

const Logo = () => {
    return (
        <Container>
            <Img src={logo} />
        </Container>
    )
}

export default Logo;