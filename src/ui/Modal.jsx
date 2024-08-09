import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

// Styled components for Modal and Overlay
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// Create a context for the modal to manage open and close state
const ModalContext = createContext();

// Main Modal component
export default function Modal({ children }) {
  // State to track which modal window is open
  const [openName, setOpenName] = useState('');

  // Function to close the modal
  const close = () => setOpenName("");
  // Function to open the modal with a specific name
  const open = setOpenName;

  // Providing open and close functions and openName state through context
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// Component to open a specific modal window
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // Cloning the child element and adding onClick event to open the modal
  return cloneElement(children, { onClick: () => {
  
    open(opensWindowName);
  } });
}

// Component to render the modal window if the name matches the openName state
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  
 const ref = useOutsideClick(close)

  if (name !== openName) return null;

  // Create a portal to render the modal in the DOM
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}><HiXMark /></Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Attach Open and Window components as static properties to Modal component
Modal.Open = Open;
Modal.Window = Window;
