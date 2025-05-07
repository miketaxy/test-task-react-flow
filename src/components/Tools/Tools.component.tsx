import { useAppDispatch } from "@/Hooks/UseAppDispatch.hooks";
import { useAppSelector } from "@/Hooks/UseAppSelector.hooks";
import { setChosenNode, updateNodeLabel } from "@/storage/FlowSlice.storage";
import { useState, useEffect } from "react";

export default function Tools() {
  const dispatch = useAppDispatch();
  const chosenNode = useAppSelector((state) => state.FlowReducer.chosenNode);
  const [editedLabel, setEditedLabel] = useState(chosenNode?.data.label || "");

  useEffect(() => {
    setEditedLabel(chosenNode?.data.label || "");
  }, [chosenNode]);

  const handleSave = () => {
    if (chosenNode) {
      dispatch(updateNodeLabel({ id: chosenNode.id, label: editedLabel }));
    }
  };

  if (!chosenNode) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 transform translate-x-0 tools-container">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Node Settings</h2>
        <input
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Node name"
        />
        <menu className="flex flex-col justify-between items-center mt-4 gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              dispatch(setChosenNode(null));
            }}
            className="bg-red-500 w-full hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
          >
            Cancel
          </button>
        </menu>
      </div>
    </div>
  );
}
