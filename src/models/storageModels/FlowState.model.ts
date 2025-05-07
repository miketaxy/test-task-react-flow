import type { Edge, Node } from "reactflow";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  chosenNode: Node | null;
}
