import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 580px;
  margin: 30px auto 0;

  display: flex;
  flex-direction: column;

  button {
    margin: 0 auto;
    margin-top: 10px;
    background-color: #006400;

    width: 50px;
  }
`;

export const EventTable = styled.div`
  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;

    border: 2px solid #a9a9a9;

    margin-top: 10px;
  }

  a {
    background: #6495ed;
    text-decoration: none;
    margin-top: 7px;

    width: 60px;
    padding: 5px;

    a:hover {
      background-color: #6415ed;
    }
  }

  div {
    display: flex;
    flex-direction: row;

    h1 {
      margin-left: 3px;
    }

    button {
      margin-left: 5px;
      margin-top: 5px;

      & + button {
        margin-left: 10px;
      }
    }
  }
`;
