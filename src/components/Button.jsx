export default function Button ({name, onClick}) {
  return (
    <>
      <button onClick={onClick}
      className="px-4 py-2 bg-purple-700 text-white hover:bg-purple-600  font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer border-none"
      >
        {name}
      </button>
    </>
  )
}