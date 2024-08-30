"use client";

import { useGetAllUsers, ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
import React from 'react';
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import { useDeleteUser } from '../api/useDeleteUser';
import { useQueryClient } from '@tanstack/react-query';


const UserList = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useGetAllUsers();
    const deleteUser = useDeleteUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            try {
                await deleteUser.mutateAsync(userId);
                alert('사용자가 성공적으로 삭제되었습니다.');
            } catch (error) {
                console.error('사용자 삭제 중 오류 발생: ', error);
                alert('사용자 삭제 중 오류가 발생했습니다.');
            }
        } else {
            alert('관리자가 취소하였습니다.');
        }
    }

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
                            <th>적립금</th>
                            <th>등급</th>
                            <th>액션</th>
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
                                <td>{user.point || '-'}</td>
                                <td>{user.level}</td>
                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteUser(user.userId)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
};

export default UserList;