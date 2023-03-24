// import React from 'react';
// import axios from 'axios';

// class FileUpload extends React.Component {
//   state = {
//     selectedFile: null,
//     responseUrl: null,
//     freeText:"",
//     output:[]
//   };

//   fileSelectedHandler = event => {
//     this.setState({
//       selectedFile: event.target.files[0]
//     });
//   };

//   uploadFileHandler = () => {
//     const formData = new FormData();
//     formData.append('filename', this.state.selectedFile);
//     axios.post('http://localhost:1200/api/uploadFile', formData)
//       .then(res => {
//         this.setState({
//           responseUrl: res.data.downloadUrl // assuming response has url property
//         });
        
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   hanleApi = async() => {
//     await axios.post('http://localhost:1200/generateImage', {"text":this.state.freeText, url:this.state.responseUrl})
//       .then(res => {
//         console.log(res,"cechk response")
//         this.setState({
//           output: res.data.data.output // assuming response has url property
//         });

//         console.log(this.state.output)
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   handleChange = e => {
//     this.setState({
//       freeText: e.target.value
//     });
//   }



//   render() {
//     return (
//       <div>
//         <input type="file" onChange={this.fileSelectedHandler}/>
//         <button onClick={this.uploadFileHandler}>Upload</button>
//         {this.state.responseUrl && <p>Response URL: {this.state.responseUrl}</p>}
//         {this.state.responseUrl ? (<img src={this.state.responseUrl} width="300" height="100" />): ""}
//         <input type="text" name="name" value={this.state.freeText} onChange={this.handleChange}/>
//         <button onClick={this.hanleApi}>Handle API</button>
//         {this.state.output ? 
//            this.state.output.forEach(element => {
//             <img src={element} width="300" height="100" />
//            })
//         : ""}
//       </div>
//     );
//   }
// }

// export default FileUpload;



import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseUrl, setResponseUrl] = useState(null);
  const [freeText, setFreeText] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileHandler = () => {
    setLoading(true);
    console.log(loading,"Check loading1")
    const formData = new FormData();
    formData.append('filename', selectedFile);
    
    axios.post('http://10.20.20.224:1200/api/uploadFile', formData)
      .then(res => {
        setLoading("true");
        setResponseUrl(res.data.downloadUrl);
      })
      .catch(err => {
        console.log(err);
      });
      console.log(loading,"Check loading")
  };

  const hanleApi = async () => {
    await axios.post('http://10.20.20.224:1200/generateImage', { "text": freeText, url: responseUrl })
      .then(res => {
        console.log(res.data.data.output)
        setOutput(res.data.data.output);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFreeText(e.target.value);
  }

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={uploadFileHandler}>Upload</button><br/><br/><br/><br/>
      {responseUrl ? (<img src={responseUrl} width="200" height="200" />) : ""}<br/><br/><br/><br/>
      
      {/* { loading ? (
      <div>Loading...</div>
    ) :
    (
      <img src={responseUrl} alt="" />
    ) } */}
      <input type="text" name="name" value={freeText} onChange={handleChange} />
      <button onClick={hanleApi}>Generate Image</button><br/><br/><br/><br/>
      {output && output.map(element => (
        <img src={element} width="200" height="200" />
      ))}
    </div>
  );
};

export default FileUpload;


// The other parameters in the code, such as "width," "height," "samples," "num_inference_steps," "safety_checker," "enhance_prompt," "guidance_scale," "strength," "seed," "webhook," and "track_id," provide additional instructions and constraints for the algorithm. These parameters may affect the style, quality, and safety of the generated image.
