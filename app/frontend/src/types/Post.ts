import { User } from "./User";

export type PostRecipient = {
    feedback_recipient_id: number; 
    feedback_id: number; 
    recipient_id: number; 
    recipient: User;
}

export type Post = {
    feedback_id: number; 
    author_id: number; 
    model_code: string; 
    orig_prompt_text: string; 
    feedback_text: string; 
    recipients: PostRecipient[];
    author: User; 
}

export type PostsResponse = {
    posts: Post[]; 
    next_page: number; 
}