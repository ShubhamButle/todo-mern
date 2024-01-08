import styled from 'styled-components';
const Wrapper = styled.nav`
  #headerTop {
    position: sticky;
    top: 0px;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--grey-700);
    z-index: 7;
  }
  .logo {
    padding: 1rem 2.6rem;
  }
`;
export default Wrapper;
