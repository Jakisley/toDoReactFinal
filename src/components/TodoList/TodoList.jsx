import Todo from './Todo/Todo.jsx';
import React from 'react';

const TodoList = (props) => {
  const { fillteredArray, delElement, changeCheck,changeToDoDescription  } = props;

  return (
    <section>
      {fillteredArray.map((todo) => (
        <Todo
          key={todo.key}
          todo={todo}
          delElement={delElement}
          changeCheck={changeCheck}
          changeToDoDescription={changeToDoDescription}
        />
      ))}
    </section>

  );
};

export default TodoList;