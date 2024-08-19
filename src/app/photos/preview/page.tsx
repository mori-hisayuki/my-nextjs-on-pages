import { getRequestContext } from "@cloudflare/next-on-pages";
import { notFound } from "next/navigation";

export const runtime = "edge";

const PreviewPage = async ({
  searchParams,
}: {
  searchParams: {name?: string};
}) => {

  if(!searchParams.name) return notFound();

  const bucket = getRequestContext().env.MY_BUCKET;
  const data = await bucket.get(searchParams.name);
  if(!data) return notFound();

  const buffer = await data.arrayBuffer();

  return (
    <div className="p-4 space-y-2 min-h-screen">
      <h1 className="text-2xl font-bold">Preview</h1>
      <div className="relative w-fit">
        <img
          src={`data:image/png;base64,${Buffer.from(buffer).toString("base64")}`}
          alt=""
          className="object-cover rounded-lg shadow-xl w-auto"
        />
        <span className="absolute bottom-1 right-1 bg-gray-500 opacity-50 text-white text-xs px-1 rounded">
          {Math.round(buffer.byteLength / 1024)} KB
        </span>
      </div>
    </div>
  )

}

export default PreviewPage;
