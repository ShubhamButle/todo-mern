import styled from 'styled-components';
const Wrapper = styled.section`
  display: grid;
  justify-content: center;
  margin: 0 auto;

  .action-bar {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .todo-list {
    margin: 20px auto;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2.8rem;
    row-gap: 1.5rem;
    max-width: 100vw;
  }
  .form {
    width: auto;
  }

  .not-found-text {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 992px) {
    .todo-list {
      grid-template-columns: 1fr 1fr;
    }
    .form {
      width: 90vw;
    }
  }
`;
export default Wrapper;
