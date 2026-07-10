export default function Card2 ({icon, title, desc}) {
  return (
    <>
      <div className="flex flex-col items-center w-24 lg:w-26 ">
        <p className="text-2xl text-purple-700">{icon}</p>
        <p className="text-xs font-bold">{title}</p>
        <p className="text-[9px]">{desc}</p>
      </div>
    </>
  )
}