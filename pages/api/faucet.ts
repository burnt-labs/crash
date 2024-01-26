import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.NEXT_PUBLIC_XION_FAUCET_API === undefined) {
    return res.status(500).json({
      status: 'error',
      message: 'XION_FAUCET_API is undefined',
    });
  }

  if (process.env.PUBLIC_XION_FAUCET_API_KEY === undefined) {
    return res.status(500).json({
      status: 'error',
      message: 'XION_FAUCET_API is undefined',
    });
  }

  if (req.method === 'GET') {
    res.status(405).end();
  }

  if (req.body.address === undefined || req.body.coins === undefined) {
    res.status(400).end();
  }

  const { address, coins } = req.body;

  try {
    await fetch(process.env.NEXT_PUBLIC_XION_FAUCET_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.PUBLIC_XION_FAUCET_API_KEY,
      },
      body: JSON.stringify({ address, coins }),
    });
  } catch (error: Error | unknown) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  return res.status(200).json({
    status: 'ok',
  });
}
