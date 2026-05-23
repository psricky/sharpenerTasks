const { GoogleGenAI } = require('@google/genai');

const aiResponse = async (req, res) => {
    try {
        
        const { prompt } = req.body;
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })

        const responseFromAi = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `${prompt} Categorize the expenses from the below list:
            Food,Petrol,Salary,Shopping,Travel,Other and give the response in a single word.`
        }); 
        res.status(200).json({ response: responseFromAi.text });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Error occurred while generating AI response." });
    }
};

module.exports = { aiResponse };
