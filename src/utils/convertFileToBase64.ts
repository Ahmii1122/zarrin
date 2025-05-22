export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // reads file as base64 data URL
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Failed to convert file to base64");
    };
    reader.onerror = (error) => reject(error);
  });
};
