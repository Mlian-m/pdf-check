import { useState } from "react";
import styles from "./pdfChecker.module.css";
import Head from "next/head";

const Home = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfInfo, setPdfInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPdfInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/getPdfData?pdfUrl=${pdfUrl}`);
      const responseData = await res.json();
      setPdfInfo(responseData);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>PDF INFO APP</title>
        <meta name="PDF INFO APP" content="application to get pdf info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pdf__container}>
        <h1>PDF Info App</h1>
        <div className={styles.pdf__wrapper}>
          <label htmlFor="pdfUrl">PDF URL:</label>
          <div className={styles.form__control}>
            <input
              type="text"
              id="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>
        </div>
        <button onClick={fetchPdfInfo} disabled={loading}>
          {loading ? "Loading..." : "Fetch PDF Info"}
        </button>
        {pdfInfo && (
          <div className={styles.pdf__detail}>
            {pdfInfo.fileSize && <h2>PDF Info:</h2>}
            {pdfInfo.fileSize && (
              <p>
                <span>File Size:</span> {pdfInfo.fileSize}
              </p>
            )}

            {pdfInfo.pdfData && (
              <p>
                <span>Number of Pages:</span> {pdfInfo.pdfData.numpages}
              </p>
            )}

            <p>
              <span className={styles.alert__danger}>
                {pdfInfo.errorMessage}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
