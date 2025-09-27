import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";

const DocumentViewer = ({ file, fileType }) => {
  const [base64Pdf, setBase64Pdf] = useState("");

  const [numOfPages, setNumOfPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumOfPages }) {
    setNumOfPages(nextNumOfPages);
  }

  useEffect(() => {
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    // const fileUrl = window.URL.createObjectURL(file);

    file &&
      getBase64(file).then((data) => {
        setBase64Pdf(data);
      });
  }, [file]);

  return (
    <div className="w-full" style={{ width: "100%", height: "fit-content" }}>
      <Document
        file={base64Pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        // onLoadError={(error) => console.log({ error })}
      >
        {Array.from(
          { length: fileType !== "pastQuestions" ? 3 : numOfPages },
          (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          )
        )}
      </Document>
    </div>
  );
};

export default DocumentViewer;
