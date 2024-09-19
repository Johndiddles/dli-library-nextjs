import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";

const DocumentViewer = ({ file, fileType }) => {
  const [base64Pdf, setBase64Pdf] = useState("");

  const [numOfPages, setNumOfPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log({ pageNumber, numOfPages });

  function onDocumentLoadSuccess({ numPages: nextNumOfPages }) {
    console.log({ nextNumOfPages });
    setNumOfPages(nextNumOfPages);
  }

  const pageRefs = useRef({});
  const onItemClick = ({ pageNumber }) =>
    pageRefs.current[pageNumber].scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    file &&
      getBase64(file).then((data) => {
        setBase64Pdf(data);
      });
  }, [file]);

  return (
    <div className="w-full" style={{ width: "100%", height: "fit-content" }}>
      <div className="flex-1 min-h-fit h-fit max-h-[720px] lg:max-h-[1200px] overflow-y-scroll">
        <Document
          file={base64Pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={onItemClick}
          // onLoadError={(error) => console.log({ error })}
        >
          {Array.from(new Array(numOfPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
          {/* {Array.from({ length: numOfPages })
            .map((x, i) => i + 1)
            .map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  pageRefs.current[index] = el;
                }}
              >
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={
                    pageNumber > numOfPages
                      ? numOfPages
                      : isNaN(pageNumber)
                      ? 1
                      : pageNumber
                  }
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))} */}
        </Document>
      </div>
    </div>
  );
};

export default DocumentViewer;
