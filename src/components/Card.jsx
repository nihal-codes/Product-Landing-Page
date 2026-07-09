export default function Card ({children}) {
  return (
    <div className="p-6 flex flex-col items-start justify-start h-fit bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:border-indigo-200 hover:-translate-y-1">
      {children}
    </div>
  )
}