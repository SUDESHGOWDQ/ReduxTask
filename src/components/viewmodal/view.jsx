import React from 'react';
import './view.css';

const Modal = ({ onClose, userData }) => {
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2 className='heading'>User Details</h2>
                <p>ID: {userData?.id ?? ''}</p>
                <p>
                    Name: {userData?.first_name ?? ''} {userData.last_name}
                </p>
                <p>Email: {userData?.email ?? ''}</p>
                <button className='close-button' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
