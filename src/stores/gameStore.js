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
  colorChangeOption: null,
  forceHideBtns: false,
  overrideResponse: '',
  refreshCount: 0,
};

const saveState = (state = {}) => {
  localStorage.setItem('savedGameState', JSON.stringify(state));
}

const loadState = () => {
  const savedState = localStorage.getItem('savedGameState');
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      return parsedState;
    } catch (error) {
      console.error('Error parsing saved game state:', error);
      return null;
    }
  }
  return null;
}

/**
 * @param {{ questions?: { whatsYourName: { step: number; questionType: string; questionTitle: string; textboxPlaceholderText: string; questions: { nextQuestionKey: string; }[]; }; lightOrDarkBackground: { step: number; questionType: string; response: string; questionTitle: string; questions: { text: string; nextQuestionKey: string; }[]; }; }; nextQuestionKey?: string; playAttempts?: number; playerName?: string; bgColor?: string; answers: any; }} state
 * @param {{ type: any; payload: any; }} action
 */
function reducer(state, action) {
  let newState;

  switch (action.type) {
    case C.ANSWER_QUESTION:
      newState = {
        ...state,
        answers: [...state.answers, action.payload],
      };

      saveState(newState);

      return newState;

    case C.RESET_GAME:
      return { ...initialState };

    case C.SET_QUESTION_KEY:
      newState = {
        ...state,
        nextQuestionKey: action.payload,
      };

      saveState(newState);

      return newState;

    case C.SET_PLAYER_NAME:
      newState = {
        ...state,
        playerName: action.payload,
      };

      saveState(newState);

      return newState;
      
    case C.SET_BG_COLOR:
      newState = {
        ...state,
        bgColor: action.payload,
      };

      saveState(newState);

      return newState;

    case C.SET_COLOR_CHANGE_OPTION:
      newState = {
        ...state,
        colorChangeOption: action.payload,
      };

      saveState(newState);

      return newState;

    case C.SET_RESPONSE:
      newState = {
        ...state,
        overrideResponse: action.payload,
      };

      saveState(newState);

      return newState;

    case C.SET_FORCE_HIDE_BTNS:
      newState = {
        ...state,
        forceHideBtns: action.payload,
      };

      saveState(newState);

      return newState;

    case C.SET_REFRESH_COUNT:
      newState = {
        ...state,
        refreshCount: action.payload,
      };

      saveState(newState);

      return newState;

    default:
      return state;
  }
}

function createGameStore() {
  const loadedState = loadState() || initialState;

  const { subscribe, set, update } = writable({ ...loadedState });

  return {
    subscribe,
    // @ts-ignore
    dispatch: (/** @type {any} */ action) => update((state) => reducer(state, action)),
    reset: () => set({ ...initialState }),
  };
}

export const gameStore = createGameStore();
