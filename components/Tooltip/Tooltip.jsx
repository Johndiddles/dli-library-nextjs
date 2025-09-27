import React from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({ button, tooltiptext }) => {
  return (
    <>
      <div className={styles.tooltip}>
        {button}
        <span className={styles.tooltiptext}>{tooltiptext}</span>
      </div>
    </>
  );
};

export default Tooltip;
