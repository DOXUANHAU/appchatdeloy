import Styles from "./styles.module.css";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useNavigate, Link } from "react-router-dom";
const cx = classNames.bind(Styles);

function ButtonComponent(props) {
  return (
    <>
      <button className={cx("btn")} onClick={props.onClick}>
        {/* <Link to={props.to}>{props.title}</Link> */}
        {props.to ? (
          <Link style={{ color: "white" }} to={props.to}>
            {props.title}
          </Link>
        ) : (
          props.title
        )}
      </button>
    </>
  );
}

export default ButtonComponent;
