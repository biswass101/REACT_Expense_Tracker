import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function UseFilter(dataList, callback) {

    // console.log(callback);
  const [query, setQuery] = useLocalStorage('query', ''); 
  const fileteredData = dataList.filter((data) =>{
    
    // data.category.toLowerCase().includes(query) //hard codded for category
    return callback(data).toLowerCase().includes(query)
  
  });

  return [fileteredData, setQuery];
}
