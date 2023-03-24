const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()


const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY 
    //create open on beta.openai.com for api key
})

const openai = new OpenAIApi(configuration)

exports.generateImage = async(req,res)=>{
    const {prompt,size} = req.body
    try {
        let imageSize = size =="small" ? '256x256' :size=="medium" ? '512x512' : '1024x1024'
        const response = await openai.createImage({
            prompt:prompt,
            n:1,
            size:imageSize
        })
        console.log(response.data.data[0].url,"check response")
        const imageUrl = response.data.data[0].url
        res.status(200).json({
            success:1,
            data:imageUrl
        })
    } catch (error) {
        if(error.response){
            console.log(error.response,"Error Response")
        }
        else{
            console.log(error.message)
        }
        res.status(400).json({
            success:0,
            error:'Image could not be generated'
        })
    }
}

// send Email 
