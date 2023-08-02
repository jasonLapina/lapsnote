import { useEffect, useRef } from "react";
import styles from "./Frame.module.css";

interface FrameProps extends React.ComponentPropsWithRef<"iframe"> {
  code: string;
  err: string;
}

const html = `
<html> 
<head>
<style>html { background-color: white; }</style>
</head>
<body>
<div id='root'/>
<script>
const handleError = (err) => {
  const root = document.querySelector('#root');
  root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
  console.error(err);
};

window.addEventListener("error", (e) => {
  e.preventDefault();
  handleError(e.error);
});

window.addEventListener('message', (event) => {
  try {
    eval(event.data);
  } catch (err) {
    handleError(err);
  }
}, false);
</script>
</body>
</html>
`;

const Frame: React.FC<FrameProps> = ({ err, code }) => {
  const frameRef = useRef<any>(null);
  useEffect(() => {
    frameRef.current.srcdoc = html;
    setTimeout(() => {
      frameRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  const bundlingErrMessage = err.toString();

  return (
    <div className={styles.wrapper}>
      <iframe
        ref={frameRef}
        sandbox='allow-scripts'
        title='preview'
        srcDoc={html}
        style={{
          backgroundColor: "white",
        }}
      />
      {err.length !== 0 && (
        <div className={styles.error}>{bundlingErrMessage}</div>
      )}
    </div>
  );
};

export default Frame;
