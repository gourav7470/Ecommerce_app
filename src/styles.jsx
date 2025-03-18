import styled, { keyframes } from "styled-components";

// Background Animation
const moveBg = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-50px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

export const AnimatedBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(255, 0, 150, 0.2) 10%, rgba(0, 255, 255, 0.2) 40%);
  z-index: -1;
  animation: ${moveBg} 10s infinite linear;
`;

// Navbar Styles
export const StyledNavbar = styled.nav`
  background: #222;
  padding: 10px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const CartButton = styled.div`
  cursor: pointer;
  position: relative;
  font-size: 1.2rem;
  color: white;

  span {
    background: red;
    color: white;
    border-radius: 50%;
    padding: 5px 8px;
    font-size: 0.8rem;
    position: absolute;
    top: -5px;
    right: -10px;
  }
`;

// Card Styling
export const StyledCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    padding: 10px;
  }

  .card-body {
    padding: 15px;
  }
`;

// Button Styles
export const StyledButton = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#ccc")};
  color: ${(props) => (props.primary ? "white" : "black")};
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#aaa")};
  }
`;
