import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import { Download } from "lucide-react";
import { Document, Page,pdfjs } from 'react-pdf'; 
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a href="files/resume.pdf" download className="cursor-pointer" title="Download Resume">
          <Download className="icon" />
        </a>
      </div>
     {/*
       PDF Viewer with page arrows to navigate pages (2 pages total)
     */}
     {(() => {
        const [pageNumber, setPageNumber] = React.useState(1);
        const totalPages = 2;

        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <button
                onClick={() => setPageNumber(page => (page > 1 ? page - 1 : page))}
                disabled={pageNumber === 1}
                style={{
                  cursor: pageNumber === 1 ? "not-allowed" : "pointer",
                  opacity: pageNumber === 1 ? 0.5 : 1,
                  marginRight: 12,
                  fontSize: "1rem",
                  padding: "2px 12px",
                }}
                aria-label="Previous page"
                title="Previous page"
              >
                &#8592;
              </button>
              <span style={{ alignSelf: "center", fontWeight: "500" }}>
                Page {pageNumber} of {totalPages}
              </span>
              <button
                onClick={() => setPageNumber(page => (page < totalPages ? page + 1 : page))}
                disabled={pageNumber === totalPages}
                style={{
                  cursor: pageNumber === totalPages ? "not-allowed" : "pointer",
                  opacity: pageNumber === totalPages ? 0.5 : 1,
                  marginLeft: 12,
                  fontSize: "1rem",
                  padding: "2px 12px",
                }}
                aria-label="Next page"
                title="Next page"
              >
                &#8594;
              </button>
            </div>
            <Document file="files/resume.pdf">
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer
                renderTextLayer
              />
            </Document>
          </div>
        );
     })()}
    </>
  );
  return <div>Resume</div>;
};
const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
