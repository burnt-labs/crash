import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    res.status(405).end();
  }

  if (req.body.email === undefined) {
    res.status(400).end();
  }

  console.log('req.body', Object.values(req.body));

  const prisma = new PrismaClient();

  await prisma.aAEntry.create({
    data: {
      email: req.body.email,
      score: req.body.score || 0,
      address: req.body.address || '',
      generatedAddress: req.body.generatedAddress || '',
    },
  });

  return res.status(200).json({
    status: 'ok',
  });
}
