"use client";

import { useGetAllUsers } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
import React from 'react';
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';


const UserList = () => {
    const { data, isLoading, error } = useGetAllUsers();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.tableContainer}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>userID</th>
                        <th>Email</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>권한</th>
                        {/* <th>Customer ID</th> */}
                        <th>적립금</th>
                        <th>등급</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.roles.join(', ')}</td>
                            {/* <td>{user.customerId || '-'}</td> */}
                            <td>{user.point || '-'}</td>
                            <td>{user.level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;