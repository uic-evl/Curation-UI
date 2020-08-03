/* eslint-disable */
import React, { useState, useEffect } from 'react';
import pdfjsLib from 'pdfjs-dist';

const PdfViewer = ({ pdfUrl, pageNumber }) => {
    const [pdfDocument, setPdfDocument] = useState({});
    const [pages, setPages] = useState({});
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.bundle.js";

    // cMapUrl: '../../../../node_modules/pdfjs-dist/cmaps/',
    useEffect(() => {
        const pdfConfig = {
            url: pdfUrl,
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/cmaps/',
            cMapPacked: true
        };

        const loadPages = async (config, scale) => {
            const getDocumentTask = pdfjsLib.getDocument(config);
            const pdfDoc = await getDocumentTask.promise;
            const { numPages } = pdfDoc;

            const canvasURLs = [];
            for (let i = 0; i < numPages; i++) {
                const page = await pdfDoc.getPage(i + 1);
                const viewport = page.getViewport({ scale });
                const { width, height } = viewport;
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.className = 'page';

                const rendererContext = {
                    canvasContext: canvas.getContext('2d'),
                    viewport
                }
                const renderer = page.render(rendererContext);
                await renderer.promise;
                canvasURLs.push(canvas.toDataURL());
            }

            return canvasURLs;
        }

        const testLoad = async (config, scale) => {
            const images = await loadPages(config, scale);
            setPages(images);
            return images;
        }

        testLoad(pdfConfig, 1);
    }, [pdfUrl]);




    return (
        <div className="viewer">
            {
                Object.entries(pages).length > 0 && pages.map((canvasURL, idx) => {
                    return <img src={canvasURL} key={idx} />
                })
            }
        </div>
    )
}

export default PdfViewer;
