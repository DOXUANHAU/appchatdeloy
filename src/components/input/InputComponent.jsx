import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import Styles from "./styles.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function InputComponent(props, ref) {
  const errorE = useRef();
  const [isShake, SetisSHake] = useState(false);
  useImperativeHandle(ref, () => ({
    setError(error) {
      if (error) {
        errorE.current.innerText = error;
        SetisSHake(!isShake);
      } else {
        errorE.current.innerText = error;
        SetisSHake(!isShake);
      }
    },
  }));

  return (
    <>
      <input
        name={props.name}
        id={props.name}
        value={props.inputValue}
        type={props.type || props.name}
        className={cx("textInput")}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <div
        ref={errorE}
        className={cx("error", { [Styles.shake]: isShake })}
      ></div>
    </>
  );
}

export default forwardRef(InputComponent);
