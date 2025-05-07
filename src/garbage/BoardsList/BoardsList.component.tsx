import { useAppSelector } from "@/Hooks/UseAppSelector.hooks";
import {
  createNewBoard,
  deleteBoard,
  selectBoard,
} from "@/storage/BoardSlice.storage";
import classes from "./BoardsList.module.css";
import { useAppDispatch } from "@/Hooks/UseAppDispatch.hooks";

export default function BoardsList() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.BoardReducer.boards);
  const currentBoardId = useAppSelector(
    (state) => state.BoardReducer.currentBoard?.id
  );

  const handleCreate = () => {
    dispatch(createNewBoard());
  };

  return (
    <div className={classes.container}>
      <button onClick={handleCreate} className={classes.createButton}>
        Create New Board +
      </button>

      <div className={classes.boardsGrid}>
        {boards.map((board) => (
          <div
            key={board.id}
            className={`${classes.boardCard} ${
              currentBoardId === board.id ? classes.selected : ""
            }`}
            onClick={() => dispatch(selectBoard(board.id))}
          >
            {board.snapshot ? (
              <img
                src={board.snapshot}
                alt="Board preview"
                className={classes.thumbnail}
              />
            ) : (
              <div className={classes.placeholder}>No preview</div>
            )}
            <div className={classes.boardInfo}>
              <h4>{board.title}</h4>
              <span>{new Date(board.lastModified).toLocaleDateString()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteBoard(board.id));
                }}
                className={classes.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
