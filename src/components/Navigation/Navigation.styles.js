import styled from 'styled-components';

export const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  position: relative;
  z-index: 1000;

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0px auto;
    max-width: var(--max-width);
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 175px;
      margin-left: -15px;
    }
  }

  .nav-toggle {
    display: none;
    background: transparent;
    border: transparent;
    color: var(--primary-color);
    cursor: pointer;

    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 1rem;

    li {
      a {
        color: var(--primary-color);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--letter-spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }

    .nav-link {
      display: flex;
      /* width: 50%; */
      align-items: center;
      .active {
        color: var(--active-link);
      }
    }

    .auth-link {
      a {
        &:hover {
          border-bottom: none;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .nav-center {
      display: block;
    }
    .nav-toggle {
      display: block;
    }
    .nav-links {
      position: fixed;
      top: 5rem;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      width: 100%;
      height: calc(100vh - 5rem);
      padding: 1rem 0;
      margin: 0;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;
      z-index: 900;
      box-sizing: border-box;
    }

    .nav-links.show-nav {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .nav-links li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1rem 0;
    }
    .nav-links a {
      font-size: 1.2rem !important;
    }
    .nav-links.show-nav {
      opacity: 1;
      pointer-events: auto;
    }
    .nav-link {
      flex-direction: column;
    }
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--primary-color);
    width: 100%;
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px 0px; */
    z-index: 1;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    text-align: start;
  }

  .dropdown-content.show-dropdown {
    display: block;
  }

  .dropdown-content a {
    color: var(--secondary-color) !important;
    text-decoration: none;
    display: block;
    white-space: nowrap;
  }

  .dropdown-content a:hover {
    color: var(--primary-color) !important;
    background-color: var(--secondary-color);
  }

  .dropbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    outline: none;
    background: var(--primary-color);
    color: var(--secondary-color);
  }

  .arrow-down {
    border: solid var(--primary-color);
    border-width: 0 2px 2px 0;
    border-color: var(--secondary-color);
    padding: 3px;
    margin: 3px;
    transform: ${(props) =>
      props.isMenuOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.3s ease-in-out;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.5rem;
  }

  .user-avatar-placeholder {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  @media (max-width: 767px) {
    .dropdown-content {
      box-shadow: none;
      text-align: center;
      width: 100%;
    }

    .dropdown-content a {
      padding: 1rem;
    }
  }
`;
