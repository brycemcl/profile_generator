const readline = require('readline');

const askQuestions = (questions, template, callback) => {
  console.log("We are going to ask you a few questions. If you can't think of an answer you can just skip it:)\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  questions = questions.map(item => `${item}  `);
  let answers = [];
  const askQuestion = (questions) => {
    rl.question(questions[0], (answer) => {
      answers.push(answer);
      questions.shift();
      if (questions.length) {
        rl.resume();
        askQuestion(questions);
      } else {
        rl.close();
        callback(answers, template);
      }
    });
  };
  askQuestion(questions);
};

const makeProfile = (answers, templates) => {
  console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\nHere is your profile:");
  templates.forEach((element, index, array) => {
    if (answers[index]) {
      process.stdout.write(element(answers[index]));
    }
    if (index !== array.length) {
      process.stdout.write(" ");
    }
  });
  process.stdout.write("\n");
};

const questions = [
  `What's your name? Nicknames are also acceptable :)`,
  `What's an activity you like doing?`,
  `What do you listen to while doing that?`,
  `Which meal is your favourite (eg: dinner, brunch, etc.)`,
  `What's your favourite thing to eat for that meal?`,
  `Which sport is your absolute favourite?`,
  `What is your superpower?`,
];
const templates = [
  (answer) => `Hello! My name is ${answer}.`,
  (answer) => `I love ${answer}!`,
  (answer) => `I enjoy listening to ${answer}.`,
  (answer) => `I love ${answer} time with`,
  (answer) => `${answer}.`,
  (answer) => `I enjoy ${answer}.`,
  (answer) => `I let you in on a little secret, my superpower is ${answer}.`,
];

askQuestions(questions, templates, makeProfile);;