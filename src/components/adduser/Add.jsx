import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './add.css';
import validate from 'validate.js';
import { firstNameSchema, lastNameSchema, passwordSchema, emailSchema } from '../../helpers/schema';
import toast from '../../helpers/toaster';
import { useSelector, useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../redux/dataslice';
import { BsArrowLeftSquare } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Add = () => {
    const { status } = useSelector(state => state.users);

    const users = {
        isValid: false,
        values: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        touched: {},
        errors: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    };
    const schema = {
        first_name: firstNameSchema,
        last_name: lastNameSchema,
        email: emailSchema,
        password: passwordSchema,
    };
    const dispatch = useDispatch();

    const [user, setUser] = useState(users);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const errors = validate(user.values, schema);
        setUser(prevFormState => ({
            ...prevFormState,
            isValid: !errors,
            errors: errors || {},
        }));
    }, [user.values, user.isValid]);

    const hasError = field => !!(user.touched[field] && user.errors[field]);

    const inputHandler = event => {
        event.persist();
        let key = event.target.name;
        setUser(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [key]: event.target.value,
            },
            touched: {
                ...formState.touched,
                [key]: true,
            },
        }));
    };

    const submitForm = async e => {
        e.preventDefault();
        dispatch(createUser(user.values));
        toast({
            type: 'success',
            message: 'User data submitted successfully',
        });
        navigate('/');
    };

    return (
        <div className='addUser'>
            <Link to={'/'}>
                <BsArrowLeftSquare /> Back
            </Link>
            <h3>Add new user</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='first_name'>First name</label>
                    <input type='text' onChange={inputHandler} id='first_name' name='first_name' autoComplete='off' placeholder='First name' />
                    {hasError('first_name') && <span className='error'>{user.errors.first_name}</span>}
                </div>
                <div className='inputGroup'>
                    <label htmlFor='last_name'>Last name</label>
                    <input type='text' onChange={inputHandler} id='last_name' name='last_name' autoComplete='off' placeholder='Last name' />
                    {hasError('last_name') && <span className='error'>{user.errors.last_name}</span>}
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
                    {hasError('email') && <span className='error'>{user.errors.email}</span>}
                </div>
                <div className='inputGroup'>
                    <label htmlFor='password'>Password</label>
                    <input type={showPassword ? 'text' : 'password'} onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Password' />
                    <span className='eye-icon' onClick={togglePasswordVisibility}>
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                </div>

                <div className='inputGroup'>
                    <button type='submit' disabled={!user.isValid}>
                        ADD USER
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
