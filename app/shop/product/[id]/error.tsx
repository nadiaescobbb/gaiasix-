"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-6">
      <h2 className="text-red-600 font-bold">Error en el producto</h2>
      <p>{error.message}</p>
    </div>
  );
}
