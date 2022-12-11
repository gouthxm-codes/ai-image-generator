const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const generateImage = async (req, res) => {
    const { idea, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';


    try {
        const response = await openai.createImage({
            prompt: idea,
            n: 1,
            size: imageSize
        })
        const imageUrl = response.data.data[0].url;
        res.status(200).json({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
        console.log(error)
    }
}

module.exports = { generateImage }