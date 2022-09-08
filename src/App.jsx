import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputAddToDo from './components/InputAddTodo';
import TodoList from './components/TodoList';
import LowerMenu from './components/LowerMenu';
import styles from './App.module.css';

const App = () => {
  const [todoArray, setTodoArray] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [filterCondition, setFillterCondition] = useState(localStorage.getItem('fillter') || 'all');
  const [countActive, setCountActive] = useState(0);
  const [filltredArray, setFilltredArray] = useState(todoArray);

  useEffect(() => {
    localStorage.setItem('fillter', filterCondition);
  }, [filterCondition]);

  useEffect(() => {
    setFilltredArray(filterCondition !== 'all' ? todoArray.filter(element => element.state === filterCondition) : todoArray)
  }, [todoArray, filterCondition]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoArray));
    setCountActive(todoArray.filter(element => element.state === 'active').length);
  }, [todoArray]);
  const updatedTodoArr = useMemo(() => {
    return [...todoArray];
  }, [todoArray]);

  const getIndex = (key) => {
    return todoArray.findIndex(element => element.key === key);
  };

  const addTodo = (todo) => {
    let key = 0;
    const arraylength = todoArray.length;
    if (arraylength > 0) {
      key = todoArray[arraylength - 1].key + 1;
    };
    if (todo) {
      setTodoArray([...todoArray, { key: +key, description: todo, state: 'active' }]);
    };
  };

  const changeAllCheck = () => {
    const index = todoArray.findIndex(todo => todo.state === 'active');
    const state = index === -1 ? 'active' : 'completed';
    setTodoArray(updatedTodoArr.filter(element => element.state = state));
  };

  const changeCheck = (key) => {
    const index = getIndex(key);
    updatedTodoArr[index].state = updatedTodoArr[index].state === 'active' ? 'completed' : 'active';
    setTodoArray(updatedTodoArr);
  };

 const changeToDoDescription = (key,toDoDescription)=>{
  const index = getIndex(key);
  updatedTodoArr[index].description = toDoDescription;
  setTodoArray(updatedTodoArr);
 };

  const delElement = (key) => {
    const index = getIndex(key);
    updatedTodoArr.splice(index, 1);
    setTodoArray(updatedTodoArr);
  };

  const delAllCompleted = () => {
    setTodoArray(todoArray.filter(element => element.state === 'active'));
  };

  return (
    <section className={styles.app}>
      <Header />

      <section className={styles.main}>
        <InputAddToDo
          isAllCompleted={countActive === 0}
          addTodo={addTodo}
          changeAllCheck={changeAllCheck}
        />

        <TodoList
          fillteredArray={filltredArray}
          onChangeArray={setTodoArray}
          delElement={delElement}
          changeCheck={changeCheck}
          changeToDoDescription={changeToDoDescription}
        />

        <LowerMenu
          setFillterCondition={setFillterCondition}
          countActive={countActive}
          isEnyCompleted={(todoArray.length - countActive) > 0}
          delAllCompleted={delAllCompleted}
        />
      </section>

      <Footer />
    </section>
  );
};

export default App;
