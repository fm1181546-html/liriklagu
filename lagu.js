const hue = (n) => `\x1b[38;5;${n}m`;
const reset = "\x1b[0m";
const typeSound = () => process.stdout.write("\x07");

const lyrics = [
  { t: 0,     text: "I'll probably be a waste of your time, but who knows?" },
  { t: 5000,  text: "Chances are I'll step out of line, but who knows?" },
  { t: 10000, text: "Lately, you've set up in my mind" },
  { t: 14000, text: "Yeah, girl, you, and I like that, ooh" },
  { t: 18500, text: "Lately, I've been thinking that perhaps I am a coward" },
  { t: 24000, text: "Hiding in a disguise of an ever-giving flower" },
  { t: 29500, text: "Incompetent steward of all of that sweet, sweet power" },
  { t: 35000, text: "Yesterday was feeling so good, now it's gone" },
  { t: 40000, text: "I'd feel like that always if I could, is that wrong?" },
  { t: 45000, text: "Tell me 'bout the city you're from" },
  { t: 50000, text: "Is it hot? Does it snow there?" },
  { t: 55500, text: "Lately, I've been thinking 'bout my precarious future" },
  { t: 61000, text: "Will you be there with me by my side, my girl, my shooter?" },
  { t: 67000, text: "Who's to say who calculates? Not me, I'm no computer" },
  { t: 72500, text: "Is it a crime to be unsure?" },
  { t: 77000, text: "In time, we'll find if it's sustainable" },
  { t: 82000, text: "You're pure, you're kind, mature, divine" },
  { t: 87500, text: "You might be too good for me, unattainable" },
  { t: 93500, text: "Maybe we get married one day, but who knows?" },
  { t: 99000, text: "Think I'll take that thought to the grave, but who knows?" },
  { t: 104500,text: "I know that I'll love you always" },
  { t: 109500,text: "Yeah, girl, you, and I like that" },
  { t: 114000,text: "Who knows? Who knows?" },
  { t: 118000,text: "Who knows? Who knows?" },
  { t: 122000,text: "Who knows? Who knows?" },
  { t: 126000,text: "Who knows? Who knows?" },
];

console.log("\x1b[2J\x1b[?25l");
console.log("═".repeat(80));
console.log(" ".repeat(35) + hue(201) + "WHO KNOWS" + reset);
console.log(" ".repeat(22) + hue(159) + "Daniel Caesar – Freudian (2017)" + reset);
console.log("═".repeat(80));
console.log("\n");

let startTime;
let currentLine = "";
let typed = "";
let typingIndex = 0;
let currentLyricIndex = 0;

const typeNextChar = () => {
  if (typingIndex < currentLine.length) {
    const char = currentLine.charAt(typingIndex);
    typed += char;
    typingIndex++;
    typeSound();
    process.stdout.write("\x1b[8;0H\x1b[0J");
    process.stdout.write(hue(231) + typed.padStart(40 + Math.floor(typed.length / 2)).padEnd(80) + reset);

    const delay = 180 + Math.random() * 180; 
    setTimeout(typeNextChar, delay);
  }
};

const update = () => {
  const elapsed = Date.now() - startTime;

  while (currentLyricIndex < lyrics.length && elapsed >= lyrics[currentLyricIndex].t) {
    currentLine = lyrics[currentLyricIndex].text;
    typed = "";
    typingIndex = 0;
    process.stdout.write("\x1b[8;0H\x1b[0J");
    
    setTimeout(typeNextChar, 250); 
    currentLyricIndex++;
  }

  if (elapsed < 135000) {
    setTimeout(update, 50);
  }
};

console.log(" ".repeat(25) + hue(226) + "Tekan Enter untuk mulai..." + reset);
process.stdin.once('data', () => {
  console.log("\x1b[2J\x1b[H");
  startTime = Date.now();
  currentLyricIndex = 0;
  update();
});

process.on('SIGINT', () => {
  console.log("\x1b[?25h\x1b[0m\n");
  process.exit();
});