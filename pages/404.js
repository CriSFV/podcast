import Link from "next/link";

export default function Custom404() {
  return (
    <main className="not_found">
      <h1> Ups - Podcast Not Found</h1>
      <p>
        Please, go back <Link href={"/"}>to de list of podcast</Link>
      </p>
    </main>
  );
}
