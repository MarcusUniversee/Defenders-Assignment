import Image from "next/image";
import Marcus from "./components/Marcus";
import Abby from "./components/Abby";
import Iyyah from "./components/Iyyah";
import Aaron from "./components/Aaron";
import Linda from "./components/Linda";
import Liyah from "./components/Liyah";
import Nathan from "./components/Nathan";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-3xl">Defenders Technical Workshop Assignment #1</h2>
      <h3 className="text-lg">Edit your component! Make sure you are working on your own branch</h3>
      <div className="flex space-x-2"><p>Marcus:</p><Marcus /></div>
      <div className="flex space-x-2"><p>Aaron:</p><Aaron /></div>
      <div className="flex space-x-2"><p>Abby:</p><Abby /></div>
      <div className="flex space-x-2"><p>Iyyah:</p><Iyyah /></div>
      <div className="flex space-x-2"><p>Linda:</p><Linda /></div>
      <div className="flex space-x-2"><p>Liyah:</p><Liyah /></div>
      <div className="flex space-x-2"><p>Nathan:</p><Nathan /></div>
    </div>
  );
}
