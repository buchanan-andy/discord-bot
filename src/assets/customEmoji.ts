type CustomEmoji = {
    [key: string]: string;
}

export const serverEmoji:CustomEmoji = {
    tobi : '<:tobi:949509521494118400>',
    tobi2 : '<:tobi2:969613038393126942>',
    tobi3 : '<:tobi3:1197706342132109324>',
    ltobi2 : '<:ltobi2:969624069324554311>',
    utobi2 : '<:utobi2:1160979213927579810>',
    larry: '<:larry:1075603657665564672>'
}

export function getRandomTobi(): string | undefined {
    const tobis = Object.keys(serverEmoji).filter(key => key.includes('tobi'));
    const randomTobi = tobis[Math.floor(Math.random() * tobis.length)];
    return serverEmoji[randomTobi]; 
}
