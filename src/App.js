import './App.css';
// import concateName from './utils/concate.name'
// import dateFormat from './utils/date.format'
// import customTost from './utils/constum.message'
// import ConvertToBase64 from './utils/convertTobase64'
// import { imageFormatValid } from './utils/image.valid.format'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    // console.log(concateName({ firstname: 'zain', }))
    // console.log(dateFormat.fullDateWithOutTimeInWords(new Date()))
    // customTost('error', 'login failde')
  }, [])

  async function handleSelectImage(e) {
    // console.log(e.target.files[0])
    // const a = await ConvertToBase64(e.target.files[0])
    // console.log(a)
    // console.log(imageFormatValid(e.target.files[0]))
  }

  return (
    <div className="App">
      <input
        type="file"
        placeholder="select image"
        onChange={handleSelectImage}
      />
    </div>
  );
}

export default App;
