const express = require('express')
const textToImage = require('text-to-image');
const path = require('path');
require('dotenv').config()
const multer = require("multer");
const axios = require('axios')
// const upload = multer({ dest: "public/files" });

var cors = require('cors')

// firebase connection 
const  {initializeApp}  = require('firebase/app')
// const { getAnalytics } = "firebase/analytics";
const {getStorage ,ref,getDownloadURL,uploadBytesResumable} = require('firebase/storage')


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});



const app = express() 
const port=1200

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));




const firebaseConfig = {
  apiKey: "AIzaSyC9UQbQHy3gcWW-R2sY1tfTpKlPT_tf_3g",
  authDomain: "image-upload-5c127.firebaseapp.com",
  projectId: "image-upload-5c127",
  storageBucket: "image-upload-5c127.appspot.com",
  messagingSenderId: "1854759670",
  appId: "1:1854759670:web:a40ae091900e516b0342d7",
  measurementId: "G-Z2LWY4BTHF"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });


app.post("/api/uploadFile", upload.single("filename"), async(req, res) => {
  try {
    console.log("hii")
    const storageRef = ref(storage,`files/${req.file.originalname }`) 
    console.log("in function")
    const metaData = {contentType:req.file.mimetype}
    //upload file in bucket 
    const snapshot = await uploadBytesResumable(storageRef,req.file.buffer,metaData);
    let downloadUrl = await getDownloadURL(snapshot.ref)

    
    // hitAPI(downloadUrl) 
    res.send({message:"File upload successfully.",
    name:req.file.originalname ,
    type:req.file.mimetype,
    downloadUrl:downloadUrl})
  } catch (error) {
    console.log(error)
  }
});

// const button = document. getElementById('btn'); 
// button. addEventListener('click', function () { fetch('10.20.20.224:1200/api/uploadFile')})

// <%= content %>
// <% if (value) { %>

//   <%= value %>
  
//   <% } %>

// function hitAPI($image_url){
  app.post('/generateImage',async(req,res)=>{
    const {text, url} = req.body
    try {
      const rawResponse = await fetch('https://stablediffusionapi.com/api/v3/img2img', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: "EEskI80wFk7kEeswMuLq9VHjHwRNVB2ccz7b5DfUIQVgiIRrKljmdJCVJ0eF",
        prompt: text,
        init_image: url,
        width: "512",
        height: "512",
        samples: "3" ,
        seed: "1283631707238045",
        negative_prompt: "((adult)),((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime ((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))",
        num_inference_steps: "30",    
        safety_checker: "no",   
        enhance_prompt: "yes",  
        guidance_scale: 10,    
        prompt_strength: 1.0,
        webhook: null, 
        track_id: null
        
    })
    });
   content = await rawResponse.json()
   console.log(content,"Check content")
   res.status(200).json({data:content})
    } catch (error) {
      
    }
  })
// }


const check = (async () => {
//   const rawResponse = await fetch('https://stablediffusionapi.com/api/v3/img2img', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       key: "JCIIurwbM2GNfhav5aOhOjujEP2VDc0RdZL90k2YrESUYSVRGagvKwOZbVzK",
//       prompt: "a cat sitting on a bench",
//       init_image: "https://raw.githubusercontent.com/CompVis/stable-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png",
//       width: "512",
//       height: "512",
//       samples: "1"
      
//   })
//   });
//  content = await rawResponse.json()
//  img =  JSON.stringify(content)
//   console.log(content);
})();


app.use("/", (req, res) => {
  res.status(200).render("index", {"content":"https://firebasestorage.googleapis.com/v0/b/image-upload-5c127.appspot.com/o/files%2FScreenshot%20from%202022-10-31%2023-40-11.png?alt=media&token=c3748d63-ebd4-4edf-8241-86e9bc375fdf"});
});



// textToImage.generate('A hi is happpy', {
//     debug: true,
//     debugFilename: path.join('some', 'debug_file.png'),
//   });

app.use('/openai',require('./routes/openaiRoute'))

app.listen(port,()=>{
    console.log("Server is runnning")
})