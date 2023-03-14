

export type ChatGPTResponseChoice = {
    finish_reason: string;
    index: number; 
    logprobs: any; 
    text: string;
}

export type ChatGPTResponse = {
    id: string; 
    choices: ChatGPTResponseChoice[]; 
    model: string; 
    created: number; 
    object: string;
}

export type User = {
    user_id: number; 
    user_code: string;
    first_name: string;
    last_name: string;
    email_address: string;
    avatar?: string;
}