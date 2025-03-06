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

    // const putUser = async (id: string) => {
    //     const
    //
    // }

    return {
        users,
        fetchUsers,
        deleteUsers,
        createUsers,
    }

})