import React from "react";

const ContextMenu = ({ menuPosition, setMenuPosition, setExpenses, setExpense, expenses, rowId, setEditingRowId }) => {
  // console.log(menuPosition.left);
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          const {title, category, amount} = expenses.find((expense) => expense.id === rowId)
          setEditingRowId(rowId)
          setExpense({title, category, amount})
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
