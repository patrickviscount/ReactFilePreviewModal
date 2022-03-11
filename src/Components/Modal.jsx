import React, { useEffect, useState } from "react";
import "./Modal.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const Modal = (props) => {
  const [loading, setLoading] = useState(false);

  var docs = [];

  if (props.file === "") {
    docs = [
      // { uri: require("../../things to do.docx") },
      { uri: require("../../test.pdf") }
      // {
      //   uri:
      //     "https://www.clickdimensions.com/links/TestPDFfile.pdf"
      // }
    ];
  } else {
    let temp = props.file;
    console.log(temp);
    docs = [{ uri: require(temp) }];
  }

  const closeOnEsc = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    // setLoading(true);
    document.body.addEventListener("keydown", closeOnEsc);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  });

  if (!props.show) {
    return null;
  }
  if (loading === true || !docs) {
    return (
      <div className="modal" onClick={props.onClose}>
        {" "}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1>Content isn't finished loading</h1>{" "}
          <p>Please close and try again </p>
        </div>{" "}
      </div>
    );
  }

  return (
    <div
      className="modal"
      onClick={props.onClose}
      style={{ height: document.body.scrollHeight + 25 }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">File Preview</h4>
        </div>
        <div className="modal-body">
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            theme={{
              primary: "#5296d8",
              secondary: "#ffffff",
              tertiary: "#5296d899",
              text_primary: "#ffffff",
              text_secondary: "#5296d8",
              text_tertiary: "#00000099",
              disableThemeScrollbar: false
            }}
            config={{
              header: {
                disableHeader: false,
                disableFileName: true,
                retainURLParams: true
              }
            }}
          />
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="exitButton">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
