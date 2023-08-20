import styled from "styled-components";

const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
  };

  export const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    mobileM: `(min-width: ${sizes.mobileM})`,
    mobileL: `(max-width: ${sizes.mobileL})`,
    tablet: `(max-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
  };

export const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  flex-grow: 2;
  height: 90%;
  float: center;
  width: 80vw;
  margin:auto;
  margin-top:20px;
  align-content: center;
  background: white;
  color: black;
  @media ${devices.tablet} {
    width: 50vw;
  }
  @media ${devices.mobileL} {
    width: 50vw;
  }
  
`;
