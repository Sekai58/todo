import logo from "../../assets/icon.jpg"

const Navbar = () => {
  return (
    <div className="fixed w-full top-0 left-0 z-[999] bg-gradient-to-r to-[#412337] from-[#1A5265] border-b-[0.5px] border-[#7a7a7a] ">
      <nav className="flex justify-between p-5 text-white">
        <div className="w-7 h-7 flex bg-white rounded-full bg-opacity-30 border-1 shadow-md text-center items-center"><img src={logo} className="rounded-full w-7 h-7 mr-3"></img><span className="text-2xl font-bold">ToDoList</span></div>
        <div className="relative text-[#818080] z-[9999]">
          <span className="absolute left-2 top-1"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" className=" h-8 w-72 text-[#161616] rounded-md shadow-[#5b5a5a] shadow-sm pl-7"/>
        </div>
        <div className="flex"></div>
      </nav>
    </div>
  )
}

export default Navbar