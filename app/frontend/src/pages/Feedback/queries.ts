import { User } from "@/types/User";
import { Post, PostsResponse } from "@/types/Post";

export const fetchUser = async (id: string | number): Promise<User> => {
    const response = await fetch(`/api/crud/user/${id}`)
    if (!response.ok) {
        throw new Error('Cannot get user')
    }
    return response.json()
}