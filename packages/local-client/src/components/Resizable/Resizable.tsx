import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface ResizableProps {
  children: React.ReactNode;
  direction: "vertical" | "horizontal";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.5);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.5);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
      clearTimeout(timer);
    };
  }, [width]);

  let props: ResizableBoxProps;

  if (direction === "horizontal") {
    props = {
      className: "horizontal",
      lockAspectRatio: false,
      height: Infinity,
      width,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    props = {
      lockAspectRatio: false,
      height: 400,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 120],
      maxConstraints: [Infinity, innerHeight * 0.95],
    };
  }

  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;
