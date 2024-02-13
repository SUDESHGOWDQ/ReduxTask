import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async userId => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const data = await response.json();
    return data;
});

export const createUser = createAsyncThunk('users/createUser', async user => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async userId => {
    await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    return userId; // Return the id to identify which user was deleted
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                const helper = state.users;
                helper.push(action.payload);
                state.users = helper;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = { ...state.users[index], ...action.payload };
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;
