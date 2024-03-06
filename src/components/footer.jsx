'use client'

function Footer(){

return (
        <footer className="relative h-48 mt-20 bg-purple-800 flex items-center justify-between overflow-hidden text-white w-full top-0">
          <div className="w-1/3 h-full flex">
            <div className="flex">
              <div className="w-full p-4 sm:flex sm:flex-col sm:items-start sm:ml-10 mt-10">
                <div className="text-xs md:text-sm">
                  <p>TOT Co.</p>
                  <p>999 W 999 S</p>
                  <p>Rexburg, ID 83440</p>
                </div>
                <p id="copyright" className="mt-4"> &#169; January 2024 </p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 bottom-0 w-2/5 bg-purple-900 transform origin-bottom-right -skew-x-12 overflow-hidden text-xs">
            <div className="flex">
              <div className="imagegrid grid-cols-2 grid-rows-2 transform skew-x-12 mt-8 ml-6 hidden md:grid w-auto">
                <div className="flex items-center justify-center skew-center -mb-6">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="images/icons8-facebook-48.png" alt="facebook icon" />
                  </a>
                </div>
                <div className="flex items-center justify-center skew-center -mb-6">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="images/icons8-instagram-48.png" alt="instagram icon" />
                  </a>
                </div>
                <div className="flex items-center justify-center skew-center">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="images/icons8-linkedin-48.png" alt="linkedin icon" />
                  </a>
                </div>
                <div className="flex items-center justify-center skew-center">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <img src="images/icons8-github-48.png" alt="github icon" />
                  </a>
                </div>
              </div>
              <ul className="w-full p-4 transform skew-x-12 uppercase sm:flex sm:flex-col sm:items-end sm:mr-10 mt-10">
                <li className="flex items-center justify-center p-1 sm:mr-10"><a href="#">Our Story</a></li>
                <li className="flex items-center justify-center p-1 sm:mr-10"><a href="#">Careers</a></li>
                <li className="flex items-center justify-center p-1 sm:mr-10"><a href="#">Terms of Use</a></li>
                <li className="flex items-center justify-center p-1 sm:mr-10"><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </footer>
)
}

export {Footer}