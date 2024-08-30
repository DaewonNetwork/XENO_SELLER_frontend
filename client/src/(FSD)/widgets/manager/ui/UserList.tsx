"use client";

import { useGetAllUsers } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import { UserInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
import React from 'react';


const UserList = () => {
    const { data, isLoading, error } = useGetAllUsers();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Roles</th>
                        <th>Customer ID</th>
                        <th>Point</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user: UserInfo) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.roles.join(', ')}</td>
                            <td>{user.customerId}</td>
                            <td>{user.point}</td>
                            <td>{user.level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;