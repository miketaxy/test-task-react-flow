import type { FlowState } from "@/models/storageModels/FlowState.model";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type Node,
  type NodeChange,
  type EdgeChange,
} from "reactflow";

const loadState = (): FlowState => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("flowState");
    if (saved === "undefined") {
      localStorage.removeItem("flowState");
      return { nodes: [], edges: [], chosenNode: null };
    }
    return saved
      ? JSON.parse(saved)
      : { nodes: [], edges: [], chosenNode: null };
  }
  return { nodes: [], edges: [], chosenNode: null };
};

const initialState: FlowState = loadState();

const flowSlice = createSlice({
  name: "FlowSlice",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    updateNodeLabel: (
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) node.data.label = action.payload.label;
    },
    setChosenNode: (state, action: PayloadAction<Node | null>) => {
      state.chosenNode = action.payload;
    },
    resetFlow: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("flowState");
      }
      return { nodes: [], edges: [], chosenNode: null };
    },
  },
});

export const saveStateMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    if (typeof window !== "undefined" && action.type.startsWith("FlowSlice/")) {
      localStorage.setItem(
        "flowState",
        JSON.stringify(store.getState().FlowReducer)
      );
    }
    return result;
  };

export const {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateNodeLabel,
  setChosenNode,
  resetFlow,
} = flowSlice.actions;

export default flowSlice.reducer;
