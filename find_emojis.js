const fs = require('fs');
const data = fs.readFileSync('src/data.ts', 'utf8');
const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
const matches = data.match(emojiRegex) || [];
const uniqueEmojis = Array.from(new Set(matches));
console.log(JSON.stringify(uniqueEmojis));
