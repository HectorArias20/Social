import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow-y: scroll;
  background-image: url("https://unsplash.it/1366/768?image=568");
  background-repeat: no-repeat;
  background-size: cover;
`;

export const FormBlockWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  -moz-transition: all 0.85s ease-in-out;
  -webkit-transition: all 0.85s ease-in-out;
  transition: all 0.85s ease-in-out;
  opacity: 0.90;
  background-color: ${props=>{
    switch (props.type){
      case 'login':
        return "#2C497F";
      default:
        return "#433B7C";
    }
  }}
`;

export const FormBlock = styled.section`
  position: relative;
  margin: 100px auto 0;
  width: 285px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.13);
  border-radius: 2px;
  color: #fff;
  -webkit-box-shadow: 0px 0px 16px 9px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 0px 16px 9px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 0px 16px 9px rgba(0, 0, 0, 0.07);
`;

export const FormHeader = styled.header`
  margin-bottom: 20px;
  h1 {
    font-size: 30px;
    margin: 0 0 20px;
  }
`;

export const FormToggleBlock = styled.div`
  position: relative;
  span {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.65);
  }
`;

export const FormBlockInputWrapper = styled.div`
  height: 126px;
  position: relative;
  margin-bottom: 2px;
  -moz-transition: all 0.25s cubic-bezier(0.36, 1, 0.62, 0.98) 0.3s;
  -webkit-transition: all 0.25s cubic-bezier(0.36, 1, 0.62, 0.98) 0.3s;
  transition: all 0.25s cubic-bezier(0.36, 1, 0.62, 0.98) 0.3s;
`;
