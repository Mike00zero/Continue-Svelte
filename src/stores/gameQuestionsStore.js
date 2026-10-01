import * as C from '@/constants';

export const questions = {
  whatsYourName: {
    step: 1,
    questionType: C.WHATS_YOUR_NAME,
    questionTitle: 'Lets start off easy...What is your name?',
    textboxPlaceholderText: 'Type your name... or something profound... or just lie.',
    questions: [
      {
        nextQuestionKey: 'lightOrDarkBackground',
      },
    ],
  },
  lightOrDarkBackground: {
    step: 2,
    questionType: C.BACKGROUND_COLOR,
    response: "Dont' worry, you can change this later on.",
    questionTitle: 'What background mode do you prefer?',
    questions: [
      {
        nextQuestionKey: 'clickTheButton',
      },
    ],
  },
  clickTheButton: {
    step: 3,
    questionType: C.CLICK_THE_BUTTON,
    questionTitle: 'This one should be easy... Just click the button below.',
  },
};
