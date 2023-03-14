import { User } from "@/types/User";
import { Post, PostsResponse } from "@/types/Post";

export const fetchAllUsers = async (): Promise<User[]> => {
    const response = await fetch("/api/crud/users")
    if (!response.ok) {
        throw new Error('Cannot get user list')
    }
    return response.json()
}

export const fetchUser = async (id: string | number): Promise<User> => {
    const response = await fetch(`/api/crud/user/${id}`)
    if (!response.ok) {
        throw new Error('Cannot get user')
    }
    return response.json()
}

interface FetchPostsByPageInterface {
    pageParam?: number; 
}

export const fetchPostsByPage = async ({ pageParam = 0}: FetchPostsByPageInterface): Promise<PostsResponse> => {
    const response = await fetch(`/api/crud/posts?page=${pageParam}`)
    if (!response.ok) {
        throw new Error('Cannot get posts')
    }
    return response.json()
}