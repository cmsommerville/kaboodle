

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