import { v4 as uuidv4 } from 'uuid';


export async function convertBlobPathToFile(blobPath: string) {
  const response = await fetch(blobPath);
  const blob = await response.blob();
  const fileName = uuidv4();
  const mimeType = blob.type || 'application/octet-stream';
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}