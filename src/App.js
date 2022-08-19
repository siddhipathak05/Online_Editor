import React,{useState,useEffect} from "react";
import Editor from "./Editor";
import "./index.css";
import { Row, Col, Container } from "react-bootstrap";

//import "bootstrap/dist/css/bootstrap.min.css";
import useLocalStorage from "./localstorage";

function App() {

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const htmlDefault = `<h2>Hello User</h2>`;

  const cssDefault = `body{
  text-align : center;
}`;

  const [htmlVal, updateHtmlStrorage] = useLocalStorage("html",htmlDefault);
  const [cssVal, updateCssStrorage] = useLocalStorage("css",cssDefault);
  const [jsVal, updateJsStrorage] = useLocalStorage("js","");

  const [html, updateHtml] = useState(htmlVal);
  const [css, updateCss] = useState(cssVal);
  const [js, updateJs] = useState(jsVal);

  // function htmlChange(event) {
  //   const newValue = event.target.value;
  //   updateHtml(newValue);
  // }
  // function cssChange(event) {
  //   const newValue = event.target.value;
  //   updateCss(newValue);
  // }
  // function jsChange(event) {
  //   const newValue = event.target.value;
  //   updateJs(newValue);
  // }

  // function addNote(htmlVal) {
  //   updateHtml((prevNotes) => {
  //     return [...prevNotes, htmlVal];
  //   });
  //   console.log(html);
  // }

  // useEffect(()=>{
  //   localStorage.setItem('lists', JSON.stringify(htmlVal))
  // },[htmlVal]);


  // function check() {
  //   console.log("click");
  //   // setItems((prevItems) => {
  //   //   return [...prevItems, inputText];
  //   // });
   
  //   //return <p>hello world</p>;
  // }
  
  const cssURL = getBlobURL(css, "text/css");
  const jsURL = getBlobURL(js, "text/javascript");

  const srcDoc = `
      <!DOCTYPE html>
      <html>
      <head>
      ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      
      </head>
        <body>${html}
        ${js && `<script src="${jsURL}"></script>`}
        </body>
      </html>`;


  useEffect(() => {
    setTimeout(() => {}, 500);
    updateHtmlStrorage(html);
    updateCssStrorage(css);
    updateJsStrorage(js);
  }, [html, css, js]);
  
  return (
    // <div>
    //   <div className="frames">
    //     <h1>HTML <button onClick={addNote}>editor</button> </h1>
    //     <input onChange={htmlChange} type="text" value={html} />
        
    //   </div>
    //   <div className="frames">
    //     <h1>CSS <button onClick={check}>editor</button> </h1>
    //     <input onChange={cssChange} type="text" value={css} />
    //     {/* {isCheck == true ? <Editor /> : null} */}
       
    //   </div>
    //   <div className="frames">
    //     <h1>JS <button onClick={check}>editor</button> </h1>
    //     <input onChange={jsChange} type="text" value={js} />
      
    //   </div>
    //   <div>
    //     <iframe>
          
    //     </iframe>
    //   </div>
    // </div> 
    <div>
      <Container fluid={true} className="pane pane-top">
        <Row noGutters={true}>
          <Col md={4} className="editor-lang">
            <div className="editor-text">
              <i className="fab fa-html5"> </i> Html
            </div>
            <Editor
              launguage="xml"
              value={html}
              onChange={(newVal) => {
                updateHtml(newVal);
              }}
            />
          </Col>

          <Col md={4} className="editor-lang">
            <div className="editor-text">
              <i className="fab fa-css3-alt"></i> Css
            </div>
            <Editor
              launguage="css"
              value={css}
              onChange={(newVal) => {
                updateCss(newVal);
              }}
            />
          </Col>

          <Col md={4} className="editor-lang">
            <div className="editor-text">
              <i className="fab fa-js-square"></i> Js
            </div>
            <Editor
              launguage="javascript"
              value={js}
              onChange={(newVal) => {
                updateJs(newVal);
              }}
            />
          </Col>
        </Row>
      </Container>

      <Container fluid={true} className="pane pane-bottom">
        <Row noGutters={true}>
          <iframe
          srcDoc={srcDoc}
            className="output-pane"
            allowFullScreen
          ></iframe>
        </Row>
      </Container>

     
    </div>
  );



}

export default App;
