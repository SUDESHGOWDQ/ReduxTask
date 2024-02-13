import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../adduser/add.css';
import toast from '../../helpers/toaster';
import { BsArrowLeftSquare } from 'react-icons/bs';

const Edit = () => {
    const users = {
        first_name: '',
        last_name: '',
        email: '',
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/users/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async e => {
        e.preventDefault();
        await axios
            .patch(`http://localhost:8080/users/${id}`, user)
            .then(response => {
                // toast.success(response.data.msg, { position: 'top-right' });
                setTimeout(() => {
                    navigate('/');
                }, 1000);

                toast({
                    type: 'success',
                    message: 'User data updated successfully',
                });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='addUser'>
            <Link to={'/'}>
                {' '}
                <BsArrowLeftSquare /> Back
            </Link>
            <h3>Update user</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='first_name'>First name</label>
                    <input type='text' value={user.first_name} onChange={inputChangeHandler} id='first_name' name='first_name' autoComplete='off' placeholder='First name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='last_name'>Last name</label>
                    <input type='text' value={user.last_name} onChange={inputChangeHandler} id='last_name' name='last_name' autoComplete='off' placeholder='Last name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' value={user.email} onChange={inputChangeHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>UPDATE USER</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
