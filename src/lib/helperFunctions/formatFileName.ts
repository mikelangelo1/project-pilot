export default (filename: string, beginCount = 3, endCount = 2) => {
  const [file, fileFormat] = filename.split(".");
  if (file.length < 10) return filename;
  const firstFour = file.substring(0, beginCount);
  const lastThree = file.substring(file.length - endCount);
  return `${firstFour}...${lastThree}.${fileFormat}`;
};
