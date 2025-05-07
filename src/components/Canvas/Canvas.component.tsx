import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";
import InputTextNode from "../CustomNodes/InputTextNode.component";
import Tools from "../Tools/Tools.component";
import {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "@/storage/FlowSlice.storage";
import { useAppDispatch } from "@/Hooks/UseAppDispatch.hooks";
import { useAppSelector } from "@/Hooks/UseAppSelector.hooks";

const nodeTypes = {
  InputTextNode: InputTextNode,
};

export default function Canvas() {
  const { nodes, edges } = useAppSelector((state) => state.FlowReducer);
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    const newNode = {
      id: uuid(),
      type: "InputTextNode",
      position: { x: 100, y: 100 },
      data: { label: "New Task" },
    };
    dispatch(addNode(newNode));
  };

  return (
    <div className="canvas-container">
      <button onClick={handleAddTask} className="add-task-button">
        Add Task
      </button>

      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => dispatch(onNodesChange(changes))}
          onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
          onConnect={(connection) => dispatch(onConnect(connection))}
          nodeTypes={nodeTypes}
        >
          <Background gap={16} color="#aaa" />
          <Controls />
        </ReactFlow>
        <Tools />
      </div>
    </div>
  );
}
