// ml-model-wrapper.js

// Dependencies
const { NaturalLanguageUnderstandingV1 } = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Class definition for the MLModelWrapper
class MLModelWrapper {
    constructor(apiKey, apiUrl) {
        // Initialize the IBM Watson Natural Language Understanding service
        this.nlu = new NaturalLanguageUnderstandingV1({
            authenticator: new IamAuthenticator({ apikey: apiKey }),
            serviceUrl: apiUrl
        });
    }

    // Method to analyze text using the Natural Language Understanding service
    async analyzeText(text) {
        try {
            const analysisResult = await this.nlu.analyze({
                text: text,
                features: {
                    entities: {},
                    keywords: {}
                }
            });
            return analysisResult.result;
        } catch (error) {
            console.error('Error analyzing text:', error);
            throw error;
        }
    }
}

// Export the MLModelWrapper class
module.exports = MLModelWrapper;
