// This is an example of how to access a session from an API route
import { getServerSession } from "next-auth";

import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	return res.send(JSON.stringify(session, null, 2));
}
