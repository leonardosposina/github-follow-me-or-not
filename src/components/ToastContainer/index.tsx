import React from 'react';
import { Toast } from 'react-bootstrap';

import logoImg from '../../assets/images/github-logo.svg';
import { IToastMessage, useToast } from '../../hooks/toast';

import './styles.css';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  return (
    <div className="container">
      {messages.map(item => (
        <Toast
          key={item.id}
          onClose={() => removeToast(item.id)}
          animation
          autohide
          delay={3000}
        >
          <Toast.Header>
            <img src={logoImg} className="rounded mr-2" alt="GitHub Logo" />
            <strong className="mr-auto">GitHub</strong>
            <small className={item.style}>
              <strong>{item.title}</strong>
            </small>
          </Toast.Header>
          <Toast.Body>{item.description}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default ToastContainer;
