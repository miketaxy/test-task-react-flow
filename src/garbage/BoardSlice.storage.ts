import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BoardState } from "@/models/storageModels/BoardState.model";

const loadBoards = (): BoardState[] => {
  const saved = localStorage.getItem("boards");
  return saved ? JSON.parse(saved) : [];
};

const boardSlice = createSlice({
  name: "BoardSlice",
  initialState: {
    boards: loadBoards(),
    currentBoard: null as BoardState | null,
  },
  reducers: {
    createNewBoard(state) {
      const newBoard: BoardState = {
        id: Date.now().toString(),
        title: `New Board ${state.boards.length + 1}`,
        snapshot: "",
        lastModified: new Date(),
        projectData: null,
      };
      state.boards.push(newBoard);
      state.currentBoard = newBoard;
    },

    updateBoard(state, action: PayloadAction<BoardState>) {
      const index = state.boards.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
        state.currentBoard = action.payload;
      }
    },

    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
      if (state.currentBoard?.id === action.payload) {
        state.currentBoard = null;
      }
    },

    selectBoard(state, action: PayloadAction<string>) {
      const board = state.boards.find((b) => b.id === action.payload);
      if (board) state.currentBoard = board;
    },

    captureSnapshot(
      state,
      action: PayloadAction<{ id: string; snapshot: string }>
    ) {
      const board = state.boards.find((b) => b.id === action.payload.id);
      if (board) {
        board.snapshot = action.payload.snapshot;
        board.lastModified = new Date();
      }
    },
  },
});

export const saveToLocalStorage =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    if (action.type.startsWith("boards/")) {
      const state = store.getState().boards;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    }
    return result;
  };

export const {
  createNewBoard,
  updateBoard,
  deleteBoard,
  selectBoard,
  captureSnapshot,
} = boardSlice.actions;

export default boardSlice.reducer;
