import {defineStore} from "pinia";
import {ref} from "vue";
import type {User} from "../types/User.ts";
import api from "../api/api.ts";

export const useUserStore
    = defineStore('userStore', () => {
    const users = ref<User[]>([])

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            users.value = response.data;
        } catch (error: any) {
            console.error("Erro ao buscar usuarios:", error.response?.data || error.message);
        }
    };

    const deleteUsers = async (id: string) => {
        try {
            await api.delete(`/users/${id}`);
        } catch (error: any) {
            console.error("Erro ao deletar usuario:", error.response?.data || error.message);
        }
    };
    
    const createUsers = async (user: User) => {
        try {
            const response = await api.post(`/users`, user);
            users.value.push(response.data);
        } catch (error: any) {
            console.error("Erro ao criar usuario:", error.response?.data || error.message);
        }
    };

    const updateUser = async (id: number, updatedUser: Partial<User>) => {
        try {
            const response = await api.put(`/users/${id}`, updatedUser);
    
            if (response.status === 200 || response.status === 204) {
                const index = users.value.findIndex(user => user.id === id);
                if (index !== -1) {
                    users.value[index] = { ...users.value[index], ...updatedUser };
                }
            } else {
                console.warn("Erro na atualização: Resposta inesperada da API", response);
            }
        } catch (error: any) {
            console.error("Erro ao atualizar usuario:", error.response?.data || error.message);
        }
    };

    return {
        users,
        fetchUsers,
        deleteUsers,
        createUsers,
        updateUser,
    }

})