import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from '../../helpers/toaster';
import './user.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, fetchUser } from '../../redux/dataslice';
import Modal from '../viewmodal/view';

const User = () => {
    const dispatch = useDispatch();
    const { users, user, status, error } = useSelector(state => state.users);

    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, status, user]);

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleDelete = userId => {
        toast({
            type: 'error',
            message: 'User deleted sucessfully',
        });
        dispatch(deleteUser(userId));
        dispatch(fetchUsers());
    };

    const handleView = userId => {
        dispatch(fetchUser(userId));
        const selectedUser = users.find(user => user.id === userId);
        setSelectedUser(selectedUser);
        setShowViewModal(true);
    };

    return (
        <div className='userTable'>
            <Link to={'/add'} className='addButton'>
                Add User
            </Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>User name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {user.first_name} {user.last_name}
                                </td>
                                <td>{user.email}</td>
                                <td className='actionButtons'>
                                    <button onClick={() => handleDelete(user.id)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                    <Link to={`/edit/` + user.id}>
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </Link>
                                    <button id='view' onClick={() => handleView(user.id)}>
                                        <i className='fa-solid fa-eye'></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showViewModal && <Modal onClose={() => setShowViewModal(false)} userData={selectedUser} />}
        </div>
    );
};

export default User;
