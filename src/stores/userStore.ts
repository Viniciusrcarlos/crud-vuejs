import {defineStore} from "pinia";
import {ref} from "vue";
import type {User} from "../types/User.ts";
import api from "../api/api.ts";

export const useUserStore
    = defineStore('userStore', () => {
    const users = ref<User[]>([])

    const fetchUsers = async () => {
        const response = await api.get("/users")
        users.value = await response.data
    }

    const deleteUsers = async (id: string) => {
        await api.delete(`/users/${id}`)
    }

    const createUsers = async (user: User) => {
        await api.post(`/users`, user)
    }

    const updateUser = async (id: string, updatedUser: Partial<User>) => {
        try {
            const response = await api.put(`/users/${id}`, updatedUser);
            const index = users.value.findIndex(user => user.id === id);
            if (index !== -1) {
                users.value[index] = { ...users.value[index], ...updatedUser };
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    }


    return {
        users,
        fetchUsers,
        deleteUsers,
        createUsers,
        updateUser,
    }

})