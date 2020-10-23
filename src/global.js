import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  button {
    background: ${({ theme }) => theme.gradient};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.text};
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5rem;
    position: relative;
    width: 6rem;
    height: 4rem;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  .MuiPaper-root {
    
    background-color: ${({ theme }) => theme.bodyLight} !important;
    color: ${({ theme }) => theme.text} 
  }
  .MuiTypography-colorTextSecondary {
    color: ${({ theme }) => theme.text} !important;
  }
  h3 {
    color: ${({ theme }) => theme.text} !important;
  }
  td {
    color: ${({ theme }) => theme.text} !important;
  }
  `;
