import { Handle, type NodeProps, Position } from "reactflow";
import { useAppDispatch } from "@/Hooks/UseAppDispatch.hooks";
import { useEffect, useRef, useState } from "react";
import { setChosenNode, updateNodeLabel } from "@/storage/FlowSlice.storage";

export default function InputTextNode({ id, data, xPos, yPos }: NodeProps) {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(data.label);
  }, [data.label]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(updateNodeLabel({ id, label: value }));
      setEditMode(false);
    }
  };

  const handleNodeClick = () => {
    dispatch(
      setChosenNode({
        id,
        type: "InputTextNode",
        position: { x: xPos, y: yPos },
        data,
      })
    );
  };

  return (
    <div
      className="bg-white border rounded p-2 min-w-[120px] cursor-text"
      onDoubleClick={() => setEditMode(true)}
      onClick={handleNodeClick}
    >
      {editMode ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            dispatch(updateNodeLabel({ id, label: value }));
            setEditMode(false);
          }}
          className="border px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <div className="break-words">{data.label}</div>
      )}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
