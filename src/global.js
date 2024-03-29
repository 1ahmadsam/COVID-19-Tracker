import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
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
  .slider {
    background:${({ theme }) => theme.gradient};
  }
  .app__dropdown {
    background-color: ${({ theme }) => theme.bodyLight} 
  }
  .MuiInputBase-root {
    color: ${({ theme }) => theme.text} !important;
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
