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
  .form {
    width: auto;
    display: flex;
    flex-direction: column;
    box-shadow: none;
    padding: 1rem;
  }
  .form h3 {
    margin-top: 20px;
  }
`;
export default Wrapper;
