import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import { createSupabaseClient } from './supabase-client';

type UploadImageProps = {
  file: File;
  bucket: string;
  folder?: string;
};

function getStorage(){
  const {storage} = createSupabaseClient()
  return storage;
}

export async function uploadImage({
  file,
  bucket,
  folder,
}: UploadImageProps) {
  const fileName = file.name;
  const fileExtension = (fileName.split('.').pop() || 'jpg').toLowerCase();

  const newFileUUID = uuidv4();
  const path = `${folder ? folder + '/' : ''}${newFileUUID}.${fileExtension}`;
  console.log('Uploading image:', file);
  console.log('File UUID:', fileName);
  console.log('File extension:', fileExtension);
  console.log('Uploading image to path:', path);

  try {
    file = await imageCompression(file, {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.8,
    });
  }
  catch (error) {
    console.error('Error compressing image:', error);
    return { error };
  }

  const storage = getStorage();

  const { data, error } = await storage
    .from(bucket)
    .upload(path, file);
  if (error) {
    console.error('Error uploading image:', error);
    return { error };
  }

  console.log('Image uploaded successfully:', data);

  const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

  return { imageUrl: imageURL, error: null };
}