// const { StatusCodes } = require('http-status-codes');
// const AppError = require('../utils/errors/app-error');

// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const { GEMINI_KEY } = require('../config/server-config');
// const { TopicRepository } = require('../repositories');
// const { scrapeGoogleSearch } = require('./scrap-services');

// const topicRepository = new TopicRepository();
// const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// async function getQnAs(title, topic, userPrompt) {
//   try {
//     const prompt = `Generate some ${userPrompt} questions and answers on ${topic} from ${title},
//       The markdown content should be properly formated so that its readable. This should contain some differences, definations, critical questions as well. Format the response in JSON as follows:
//       {"questions": [{"question": "question 1","ans": "answer"},{"question": "question 2","ans": "answer"}...]}`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response.text();
//     let questions = response.trim().replace(/^```json\n|```$/g, '');
//     questions = JSON.parse(questions);

//     return questions.questions;
//   } catch (error) {
//     throw new AppError('Cannot delete the course', StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }

// async function getKeyNotes(title) {
//   const keyPrompt = `Generate a detailed summary on the topic "${title}", using references from the subtopics containing the following sections:
//   - Important definations (detailed) & formulas
//   - Time & Space complexities (if applicable)
//   - Differences , this vs that (if applicable)
//   - Essential concepts (definations)
//   - Important topics to keep in mind
//   - Important questions
//   - Critical dates and events (if applicable)
//   - Notable figures and their contributions (if applicable)
//   The markdown content should be properly formated so that its readable with  good spacing between lines. Dont put JSON inside content feild. The keynotes should serve as review notes. Format the response in JSON as follows:
//   {"keyNotes": [{"title": "title 1","content": "content"},{"title": "title 2","content": "content"}...]}`;

//   try {
//     const result = await model.generateContent(keyPrompt);
//     const response = await result.response.text();
//     let keyNotes = response.trim().replace(/^```json\n|```$/g, '');
//     keyNotes = JSON.parse(keyNotes);
//     return keyNotes.keyNotes;
//   } catch (error) {
//     throw new AppError('Cannot delete the course', StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }

// async function getRoadMap(title, time) {
//   const roadMapPrompt = `generate a roadmap for ${title} in JSON format based on the provided time ${time}.

//     The roadmap should include units with titles, estimated time, and topics.

//   Here is the example: '{"units": [{"title": "Unit 1","time": "25 mins","topics": ["Topic 1", "Topic 2", "Topic 3"]},{"title": "Unit 2","time": "1 hour","topics": ["Topic 1", "Topic 2", "Topic 3"]}]}' just return JSON dont give additional texts or explanations`;

//   try {
//     const result = await model.generateContent(roadMapPrompt);
//     const response = await result.response;
//     let units = await response.text();
//     units = units.trim().replace(/^```json\n|```$/g, '');
//     if (!units) throw new Error('Received empty response from AI model');

//     let parsedUnits;
//     try {
//       parsedUnits = JSON.parse(units);
//     } catch (parseError) {
//       throw new Error('Error parsing JSON response: ' + parseError.message);
//     }

//     if (!Array.isArray(parsedUnits.units)) throw new Error('Invalid roadmap structure received');

//     return parsedUnits.units;
//   } catch (error) {
//     if (error.response) {
//       console.error('genAI error response:', error.response.data);
//     } else {
//       console.error('An error occurred:', error.message);
//     }
//     throw new AppError(
//       'Something went wrong while generating the roadmap. Please try again later.',
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// }

// async function getTopic(id, subject, title, time) {
//   try {
//     const prompt = `## What is ${title} of ${subject}. Cover all the topics realted to this topic.
//       For all subjects: Leverage definations, tables, graphs to visually explain complex points.
//       For specific subjects:

//       CSE (C++): if applicable include relevant code snippets for subjects like data structures and algorithms with clear comments explaining each line's purpose, for algorithms give time and space complexities.
//       Keep it short and to the point. Dont give large passages to read.`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let data = await response.text();

//     const suggestedVideos = await scrapeGoogleSearch(subject, title);
//     if (!data || data == null) data = 'Gemini model couldnt generate for some reason';

//     const topic = await topicRepository.create({
//       courseId: id,
//       title: title,
//       markdownText: data,
//       suggestedVideos: suggestedVideos,
//     });
//     return topic;
//   } catch (error) {
//     if (error instanceof AppError) throw error;
//     if (error.response) {
//       console.error('genAI error response:', error.response);
//     } else {
//       console.error('An error occurred:', error.message);
//     }
//     throw new AppError('Cannot create a new Course object', StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }

// async function getSummary(title) {
//   try {
//     const prompt = `Summarize the topic ${title}, provide summary as a heading and content, keypoints, and formulas if exisits. Provide heading and content in a json object array.
//       Return the data in properly formatted markdown language, ensuring it supports react-markdown. Make sure to include proper headings, subheadings, and spaces between paragraphs for improved readability and tables should be properly formatted for react-markdown.`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let data = await response.text();
//     return data;
//   } catch (error) {
//     if (error instanceof AppError) throw error;
//     if (error.response) {
//       console.error('genAI error response:', error.response);
//     } else {
//       console.error('An error occurred:', error.message);
//     }
//     throw new AppError('Cannot create a new Course object', StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }

// async function getImproved(object) {
//   try {
//     const prompt = `Here is a blog model with data provided by the user: ${JSON.stringify(
//       object
//     )}. Can you improve the content of the entire blog without fabricating new details, just join all the data fields.Do very minor changes in the text just to make it readable and consise. If their are no linkedin, instagram, tweeter links dont add the You can find me on: section, also do not add any note. Blog might contain hindi words dont try to change them. Return in nicely formated markdown language`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let data = await response.text();
//     return data;
//   } catch (error) {
//     if (error.response) {
//       console.error('genAI error response:', error.response);
//     } else {
//       console.error('An error occurred:', error.message);
//     }
//     throw new AppError(
//       'Something went wrong while generating the topic content. Please try again later.',
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// }

// module.exports = {
//   getKeyNotes,
//   getQnAs,
//   getRoadMap,
//   getTopic,
//   getSummary,
//   getImproved,
// };
