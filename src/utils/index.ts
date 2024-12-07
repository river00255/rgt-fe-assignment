import imageCompression from 'browser-image-compression';

export const verifyPageNumber = (
  value: string,
  totalPage: number,
  currentPage: number
) => {
  const isNumRegex = /^[0-9]*$/;
  if (isNumRegex.test(value)) {
    if (Number(value) > totalPage) return currentPage;
    if (Number(value) < 1) return currentPage;
    return Number(value);
  }
  return currentPage;
};

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 480,
  useWebWorker: true,
};

export const compressImage = async (file: File) => {
  try {
    const compressedFile = await imageCompression(file, compressOptions);
    return compressedFile;
  } catch (e) {
    console.log(e);
  }
};
