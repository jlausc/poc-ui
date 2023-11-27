import { Voy as VoyClient } from "voy-search";

import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
import { VoyVectorStore } from "langchain/vectorstores/voy";
import { ChatOllama } from "langchain/chat_models/ollama";
import { Document } from "langchain/document";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "langchain/prompts";
import { BaseLanguageModel } from "langchain/base_language";
import { BaseRetriever } from "langchain/schema/retriever";
import { RunnableSequence } from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { get } from "svelte/store";
import { code, modelName } from "../../stores/model";

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});

const voyClient = new VoyClient();
const vectorstore = new VoyVectorStore(voyClient, embeddings);

const ollama = new ChatOllama({
  baseUrl: `https://${get(code)}-151-205-163-6.ngrok-free.app/api/generate`,
  // temperature: 0.3,
  model: get(modelName),
});

const REPHRASE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone Question:`;

const rephraseQuestionChainPrompt = PromptTemplate.fromTemplate(
  REPHRASE_QUESTION_TEMPLATE
);

const RESPONSE_SYSTEM_TEMPLATE = `You are an experienced researcher, expert at interpreting and answering questions based on provided sources. Using the provided context, answer the user's question to the best of your ability using the resources provided.
Generate a concise answer for a given question based solely on the provided search results (URL and content). You must only use information from the provided search results. Use an unbiased and journalistic tone. Combine search results together into a coherent answer. Do not repeat text.
If there is nothing in the context relevant to the question at hand, just say "Hmm, I'm not sure." Don't try to make up an answer.
Anything between the following \`context\` html blocks is retrieved from a knowledge bank, not part of the conversation with the user.
<context>
    {context}
<context/>

REMEMBER: If there is no relevant information within the context, just say "Hmm, I'm not sure." Don't try to make up an answer. Anything between the preceding 'context' html blocks is retrieved from a knowledge bank, not part of the conversation with the user.`;

const responseChainPrompt = ChatPromptTemplate.fromMessages<{
  context: string;
  chat_history: BaseMessage[];
  question: string;
}>([
  ["system", RESPONSE_SYSTEM_TEMPLATE],
  new MessagesPlaceholder("chat_history"),
  ["user", `{question}`],
]);

export const addToVectorStore = async (pdfBlob: Blob) => {
  const pdfLoader = new WebPDFLoader(pdfBlob);
  const docs = await pdfLoader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  await vectorstore.addDocuments(splitDocs);
};
