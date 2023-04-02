import path from 'path'

export const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes == 0) {
      return "N/A";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i == 0) {
      return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  };

 export const getExt = (str) => {
    const basename = path.basename(str);
    const firstDot = basename.indexOf(".");
    const lastDot = basename.lastIndexOf(".");
    const extname = path.extname(basename).replace(/(\.[a-z0-9]+).*/i, "$1");
    if (firstDot === lastDot) {
      return extname;
    }
    return basename.slice(firstDot, lastDot) + extname;
  };
