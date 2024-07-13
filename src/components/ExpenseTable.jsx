import React, { useState } from "react";
import { UseFilter } from "../hooks/UseFilter";
import ContextMenu from "./ContextMenu";

const ExpenseTable = ({
  expenses,
  setExpense,
  setExpenses,
  setEditingRowId,
}) => {
  const [filteredData, setQuery] = UseFilter(expenses, (data) => data.category); //Custom hooks for filtering
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback, setSortCallback] = useState(() => () => {}) //empty function or any fucntion will give return value to the state
  // console.log(filteredData)
  //default filter-->
  // const filteredData = expenses.filter((expense) => {
  //   return expense.category.toLowerCase().includes(category)
  // })
  // console.log(filteredData);
  const total = filteredData.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  );
  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setExpense={setExpense}
        setMenuPosition={setMenuPosition}
        expenses={expenses}
        setExpenses={setExpenses}
        rowId={rowId}
        setEditingRowId = {setEditingRowId}
      />
      <table
        className="expense-table"
        onClick={() => {
          if(menuPosition.left)
          {
            setMenuPosition({});
          }
        }}
      >
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={(e) =>{
                    setSortCallback(() => (x, y) => x.title.localeCompare(y.title))
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={(e) =>{
                    setSortCallback(() => (x, y) => y.title.localeCompare(x.title))
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                onChange={(e) => {
                  setQuery(e.target.value.toLocaleLowerCase());
                }}
              >
                <option value="">All</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={(e) =>{
                    setSortCallback(() => (x, y) => x.amount - y.amount)
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={(e) =>{
                    setSortCallback(() => (x, y) => y.amount - x.amount)
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.sort(sortCallback).map(({ id, title, category, amount }) => ( //though sort but no sorted results here
            <tr
              key={id}
              onContextMenu={(e) => {
                // console.log(e.clientX, e.clientY);
                e.preventDefault();
                setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                setRowId(id);
              }}
            >
              <td>{title}</td>
              <td>{category}</td>
              <td>tk {amount}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th className="clear-sort" onClick={() => {
              setSortCallback(() => ()=> {})
            }}>Clear Sort</th>
            <th>tk {total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpenseTable;
