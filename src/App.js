import "./styles.css";
import { useState, useEffect, useCallback } from "react";

function useConditionalIncrement(condition) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const isFunction = condition instanceof Function;
    if ((isFunction && condition()) || (!isFunction && condition)) {
      setCount(count + 1);
    }
  }, [condition]);

  return { count };
}

// let renderCycle = 0;
export default function App() {
  const [toggle, setToggle] = useState(false);

  const memoizedCheck = useCallback(() => {
    return toggle;
  }, [toggle]);

  const check = () => toggle;

  const { count: count1 } = useConditionalIncrement(toggle);
  const { count: count2 } = useConditionalIncrement(memoizedCheck);
  const { count: count3 } = useConditionalIncrement(check);
  return (
    <div className="App">
      <h1>Count1 is: {count1}</h1>
      <h1>Count2 is: {count2}</h1>
      <h1>Count3 is: {count3}</h1>
      {/* <h1>Render cycle: {renderCycle++}</h1> */}
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Toggle
      </button>
      <h1>Toggle: {toggle ? "1" : "0"}</h1>
    </div>
  );
}
