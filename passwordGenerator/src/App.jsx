import { useState, useCallback, useEffect,useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  //useRef hook for good userinterface(pta cahle ki kuch kaam hua hai)
  const passwordRef = useRef(null);
  const buttonRef = useRef("");


  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numAllowed) {
        str = str + "0123456789";
      }
      if (charAllowed) {
        str = str + " ~!@#$%^&*=+-()_{};/ ";
      }
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    },
    [length, numAllowed, charAllowed, setPassword]
  );

   // useEffect to generate password when settings change

   useEffect(() => {
    // Code to run when the component mounts or updates
    passwordGenerator();
 }, [numAllowed,charAllowed,length , setPassword]);

 
// Function to copy password to clipboard

const copyPassword = () => {
 passwordRef.current?.select();
 
 window.navigator.clipboard.writeText(password)
 buttonRef.current.style.backgroundColor = "#4CAF50";
 setTimeout(() => {
   buttonRef.current.style.backgroundColor = "blue";
 }, 1250);


}
 

  return (
    <>
      <div className=" w-full my-20 max-w-md text-white mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-green-500">
        <h1 className="text-center text-lg my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="text-orange-600 outline-none w-full py-1 px-3 "
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button
          ref={buttonRef}
          onClick={copyPassword} className="outline-none w-20 py-1 px-3 bg-blue-500 text-lg hover:bg-blue-300">
            Copy
          </button>
        </div>

        <div className="flex text-5m gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              onChange={(e) => {
                setLength(e.target.value);
              }}
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
            />
            <label htmlFor="">length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              onChange={(e) => {
                setNumAllowed((prev) => !prev);
              }}
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              className="cursor-pointer"
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              onChange={(e) => {
                // prev is just a variable means if prev is true then next time ewill bw false to ensure box tick and untick as our requirement
                setCharAllowed((prev) => !prev);
              }}
              type="checkbox"
              defaultChecked={numAllowed}
              id="charInput"
              className="cursor-pointer"
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
