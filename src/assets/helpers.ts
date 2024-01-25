export function capitalize(word: string): string {
    // Check if the word is not empty
    if (word.length === 0) {
        return word;
    }
    // Capitalize the first letter and concatenate with the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
}