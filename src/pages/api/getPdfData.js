import fs from "fs";
import path from "path";
import https from "https";
import { convertBytes, getExt } from "../../utils/helpers";
import PdfParse from "pdf-parse";

export default function (req, res) {
  const { pdfUrl } = req.query;
  if (pdfUrl === "" || !getExt(pdfUrl) || getExt(pdfUrl) !== ".pdf") {
    res.status(400).json({
      error: "true",
      errorMessage: "Invalid File Type! Please enter valid pdf url.",
    });
  } else {
    const getPdfInfo = (filename) => {
      try {
        const writeStream = fs.createWriteStream(filename);
        https.get(pdfUrl, function (response) {
          response.pipe(writeStream);
        });

        writeStream.on("finish", () => {
          const readFileSync = fs.readFileSync(filename);
          res.setHeader("Content-Type", "application/pdf");

          PdfParse(readFileSync).then((pdfData) => {
            fs.stat(filename, (err, fileStats) => {
              if (err) {
                console.log(err);
              } else {
                const fileSize = convertBytes(fileStats.size);
                res
                  .status(200)
                  .json({
                    success: true,
                    fileSize: fileSize,
                    pdfData: pdfData,
                  });
              }
            });
          });
        });
      } catch (e) {
        res.status(400).json({
          error: true,
          message: "Something went wrong! Please try later.",
        });
      }
    };
    const isLocalhost = req.headers.host.startsWith("localhost");
    if (isLocalhost) {
      const fileNameLocal = path.join(
        process.cwd(),
        `/public/files/pdfFile.pdf`
      );
      getPdfInfo(fileNameLocal);
    } else {
      const fileNameServer = `/tmp/tmpPdfFile.pdf`;
      getPdfInfo(fileNameServer);
    }
  }
}
