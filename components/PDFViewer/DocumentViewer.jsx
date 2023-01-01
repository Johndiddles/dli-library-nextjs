import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

import workerSrc from "./pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const DocumentViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  return (
    <div className="w-full" style={{ width: "100%" }}>
      <Document file={file?.url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: 1 }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

export default DocumentViewer;
