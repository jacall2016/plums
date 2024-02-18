'use client'

function Header(){

return (
    <header className="flex flex-row justify-evenly pt-10 fixed top-0 bg-purple-900 z-50 w-screen h-24">
    <img src="/images/logo.png" alt="Site Logo" className="lg:h-16 lg:w-20 h-10 w-10 -mt-4"/>
    <nav className="w-3/4">
      <ul className="flex flex-row text-white justify-evenly lg:text-3xl md:text-xl text-sm align-middle">
        <a href="/"><li>Home</li></a>
        <a href="/Topics"><li>Topics</li></a>
        <a href="/Deleted"><li>Recently Deleted</li></a>
        <a href="/Tutorial"><li>Tutorial</li></a>
      </ul>
    </nav>
  </header>
)
}

export {Header}
