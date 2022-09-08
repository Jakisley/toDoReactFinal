import styles from './Todo.module.css';
import { useState, useRef, useMemo, useEffect } from 'react';

const Todo = (props) => {
  const ref = useRef(null);
  const { todo, delElement, changeCheck,changeToDoDescription } = props;
  const [toDoDescription, setToDoDescription] = useState(todo.description);
  const [isChanged, setIsChanged] = useState(false)
  const [inputTextStyles, setInputTextStyles] = useState('');

  useEffect(() => {
    setInputTextStyles(`${styles.listElement} ${todo.state === 'active' ? '' : styles.textCopmleted}`);
  }, [todo.state])

  const checkStyles = useMemo(() => {
    return `${styles.listCheck} ${todo.state === 'active' ? '' : styles.checkCompleted}`;
  }, [todo.state]);

  const handleChange = (ev) => {
    setToDoDescription(ev.target.value);
  };

  const doubleClickInput = () => {
    const element = ref.current;
    window.getSelection().removeAllRanges();
    setInputTextStyles(inputTextStyles + `${styles.focusElement}`);
    setIsChanged(true);
    element.focus();
  };

  const handleKeyDownToDoInput = (ev) => {
    if (ev.code === 'Enter') {
      if (toDoDescription) {
        changeToDoDescription(todo.key,toDoDescription);
        ref.current.blur();
      };
    } else if (ev.code === 'Escape') {
      setToDoDescription(todo.description);
      ref.current.blur();
    }
  }

  const onBlur = () => {
    setIsChanged(false);
    changeToDoDescription(todo.key,toDoDescription);
    setInputTextStyles(`${styles.listElement} ${todo.state === 'active' ? '' : styles.textCopmleted}`)
  };

  return (
    <div className={styles.listContainer}>
      <div
        className={checkStyles}
        onClick={() => changeCheck(todo.key)}
      />
      <input
        ref={ref}
        className={inputTextStyles}
        value={toDoDescription}
        onDoubleClick={doubleClickInput}
        onKeyDown={handleKeyDownToDoInput}
        onChange={handleChange}
        onBlur={onBlur}
        readOnly={!isChanged}
      />
      <div
        className={styles.listDestroyBtn}
        onClick={() => delElement(todo.key)}
      >
        ×
      </div>
    </div>
  );
};

export default Todo;