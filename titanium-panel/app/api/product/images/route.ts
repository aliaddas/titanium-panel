import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { Readable } from 'stream';

import prismadb from '@/lib/prismadb';
import formidable from 'formidable';
import { IncomingMessage } from 'http';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const { userId: userID } = await auth();

    if (!userID) {
      return new NextResponse('Unauthorized: Missing UserID', { status: 401 });
    }

    const { fields, file } = await createUploadParseHandler(req);

    const productID = fields.productID;
    if (!file || !productID) {
      return new NextResponse('Missing file or productID', { status: 400 });
    }

    const fileName = `${Date.now()}-${file.originalFilename}`;
    const filePath = `products/${productID}/${fileName}`;

    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      const readableStream = Readable.from(file.filepath);
      readableStream.on('data', (chunk) => chunks.push(chunk));
      readableStream.on('end', () => resolve(Buffer.concat(chunks)));
      readableStream.on('error', (err) => reject(err));
    });
    const stream = Readable.from(fileBuffer);

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, stream, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype || 'image/png',
      });

    if (error) {
      console.error(error);
      return new NextResponse('Upload failed', { status: 500 });
    }

    const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filePath}`;

    const createdImage = await prismadb.productImage.create({
      data: {
        imageURL,
        productID,
      },
    });

    return NextResponse.json(createdImage, { status: 201 });
  } catch (error) {
    console.error('📢 [PRODUCT_IMAGE_UPLOAD]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
async function createUploadParseHandler(req: Request): Promise<{ fields: any; file: any; }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, keepExtensions: true });

    const incomingMessage = Object.assign(new Readable(), req) as unknown as IncomingMessage;

    form.parse(incomingMessage, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const file = files.file;
      if (!file) {
        return reject(new Error('No file uploaded'));
      }

      resolve({ fields, file });
    });
  });
}

