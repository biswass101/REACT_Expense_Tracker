import React, { useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseForm = ({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) => {
  const [errors, setErrors] = useState({});

  //validation configuration
  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 2, message: "Title should be 2 characters long" },
    ],
    category: [{ required: true, message: "Please select category" }],
    amount: [
      {
        required: true,
        message: "Please enter an amount",
      },
      {
        pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/, //for validation amount number,
        message: "Please a valid number",
      },
    ],
    // email : [{required : true, message : 'Please enter an email'},
    //   {pattern : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message : 'Please enter a valid email'}],
  };

  //checking validation
  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      // console.log(key)
      validationConfig[key].some((rule) => {
        // console.log(rule);
        if (rule.required && value === "") {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && rule.pattern.test(value) != true) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });

    //setting error for certain input fields
    setErrors(errorData);
    return errorData;
  };

  //making a expense from form data after validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;

    //updating existing expense on editing
    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { ...expense, id: crypto.randomUUID() },
    ]);

    //after maiking clearing the input filed
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  //adding maked expense to the expese table with correspondense category
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    //if files has erros then it's just clearing those errors
    setErrors({});
  };

  //r
  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <Input
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Select
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          defaultOption="Select Category"
          error={errors.category}
        />
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        {/* <Input
          label="Email"
          id="email"
          name="email"
          value={expense.email}
          onChange={handleChange}
          error={errors.email}
        /> */}
        <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
      </form>
    </>
  );
};

export default ExpenseForm;
