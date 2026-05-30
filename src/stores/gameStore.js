import { writable } from 'svelte/store';
import { questions } from './gameQuestionsStore';
import * as C from '@/constants';

const initialState = {
  questions,
  nextQuestionKey: 'whatsYourName',
  playAttempts: 1,
  playerName: '',
  bgColor: '#000',
  answers: [],
};

/**
 * @param {{ questions?: { whatsYourName: { step: number; questionType: string; questionTitle: string; textboxPlaceholderText: string; questions: { nextQuestionKey: string; }[]; }; lightOrDarkBackground: { step: number; questionType: string; response: string; questionTitle: string; questions: { text: string; nextQuestionKey: string; }[]; }; }; nextQuestionKey?: string; playAttempts?: number; playerName?: string; bgColor?: string; answers: any; }} state
 * @param {{ type: any; payload: any; }} action
 */
function reducer(state, action) {
  switch (action.type) {
    case C.ANSWER_QUESTION:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };

    case C.RESET_GAME:
      return { ...initialState };

    case C.SET_QUESTION_KEY:
      return {
        ...state,
        nextQuestionKey: action.payload,
      };

    case C.SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
      };

    default:
      return state;
  }
}

function createGameStore() {
  const { subscribe, set, update } = writable({ ...initialState });

  return {
    subscribe,
    // @ts-ignore
    dispatch: (/** @type {any} */ action) => update((state) => reducer(state, action)),
    reset: () => set({ ...initialState }),
  };
}

export const gameStore = createGameStore();
