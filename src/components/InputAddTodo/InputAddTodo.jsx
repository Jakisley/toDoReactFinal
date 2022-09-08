import { useState } from 'react';
import styles from './InputAddTodo.module.css';

const InputAddToDo = (props) => {
  const [todo, setTodo] = useState('');
  const { isAllCompleted, addTodo, changeAllCheck } = props;

  const checkStyle = `${styles.checkAllTodoBtn} ${isAllCompleted ? styles.checkAllTodoBtnActive : ''}`;

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleKeyDownAddInput = (event) => {
    if (event.key === 'Enter') {
      addTodo(todo);
      setTodo('');
    };
  };

  return (
    <section className={styles.todoAddContainer}>
      <button
        className={checkStyle}
        onClick={changeAllCheck}
      >
        ❯
      </button>

      <input
        className={styles.todoAdd}
        value={todo}
        onKeyDown={handleKeyDownAddInput}
        onChange={handleChange}
        type="text"
        placeholder="What needs to be done?"
        autoFocus
      />
    </section>
  )

};

export default InputAddToDo;