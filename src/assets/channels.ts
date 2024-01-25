type CustomChannel = {
    [key: string]: string;
}

const channels:CustomChannel = {
   general: '759061913014632470'
}

export function getChannel(name:string): string | undefined {
    const channel = Object.keys(channels).find(key => key.includes(name));
    return channels[channel]; 
}