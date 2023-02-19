
import { useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const count = await db.joke.count()
  const randomRowNumber = Math.floor(Math.random() * count)
  const [randomJoke] = await db.joke.findMany({
    take: 1, 
    skip: randomRowNumber
  })

  return json({randomJoke})
}

export default function JokesIndexRoute() {

  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>{data.randomJoke.name}</p>
      <p>{data.randomJoke.content}</p>
    </div>
  );
}