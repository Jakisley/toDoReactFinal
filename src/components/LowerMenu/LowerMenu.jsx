import React from 'react';
import styles from './LowerMenu.module.css';
import { useMemo } from 'react';

function LowerMenu(props) {
  const { setFillterCondition, countActive, isEnyCompleted, delAllCompleted } = props;
  const message = useMemo(() => {
    return `${countActive} ${countActive > 1 ? 'items left' : 'item left'}`;
  }, [countActive]);

  const clearBtnStyles = useMemo(() => {
    return isEnyCompleted ? styles.lowerMenuClearBtn : styles.hiden;
  }, [isEnyCompleted]);

  return (
    <section className={styles.lowerMenuWrapper}>
      <span className={styles.lowerMenuText}>{message}</span>

      <div className={styles.lowerMenuLinks}>
        <p className={styles.lowerMenuLink} onClick={(event) => {setFillterCondition('all') }}>All</p>
        <p className={styles.lowerMenuLink} onClick={(event) => setFillterCondition('active')}>Active</p>
        <p className={styles.lowerMenuLink} onClick={(event) => setFillterCondition('completed')}>Completed</p>
      </div>

      <span
        className={clearBtnStyles}
        onClick={delAllCompleted}
      >
        Clear completed
      </span>
    </section>
  );
};

export default LowerMenu;