import styled from 'styled-components';
const Wrapper = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius);
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .button-holders {
    display: flex;
    justify-content: end;
    gap: 20px;
    margin-top: 3rem;
  }
  .cancel-btn {
    background-color: red;
  }
  .confirm-btn {
    background-color: green;
  }
`;
export default Wrapper;
