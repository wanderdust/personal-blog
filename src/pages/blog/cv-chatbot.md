---
title: "Building a Chatbot to answer questions about your CV"
description: "I've built a chatbot that answers questions about my CV"
pubDate: "Jan 15 2023"
postImage: "/images/blog/chat-window.png"
tags: ["chatbot", "hugging-face", "React", "ML", "Terraform", "AWS"]
layout: "../../layouts/BlogPostLayout.astro"
---

**EDIT**: I gave in and decided to replace the old chatbot with the OpenAI api. The capabilities of GPT-3 are so incredible and the price is so cheap that I decided to just go for it. 
Now the chatbot is a lot more interactive and a more fun experience.

&nbsp;

[OLD]

I've recently created a chatbot to answer questions about my CV using ML. The goal of this chatbot is to provide an easy way for people to find out about my work experience by asking a chatbot.

&nbsp;

The first model that was attempted was an open-source version of GPT-3 (BLOOM & T5 to be exact). However, due to the size of the model (10+ GB), it was not possible to fit it in an AWS Lambda function. Additionally, the model was unpredictable in its answers and often provided incomplete sentences, making it unreliable for this use case.

&nbsp;

The second type of model I’ve used is extractive QA which is a lot more reliable for this task. This model extracts information from a given context based on the questions asked. However, it also has its shortcomings: It only provides short answers and requires the context to be comprehensive and in the correct format to cover all sorts of questions.

&nbsp;

To deploy this model in a cost-effective way I’ve used AWS Lambda with + API Gateway. The infrastructure was deployed using Terraform and Docker was used to containerise the model.

&nbsp;

Ultimately, the goal when designing a chatbot is to make it reliable for the specific task, particularly when it will be used in a business setting. This is why many chatbots may appear more straightforward and less engaging, as it is the best way to ensure that users will receive accurate and consistent responses. 

&nbsp;

Overall, creating a chatbot requires a thoughtful approach in choosing the right model and deployment strategy, as well as being aware of the trade-offs involved.

&nbsp;

To try it out click on the robot head in the bottom right corner of [*this page*](/).

**Repo**: [cv-chatbot-repo](https://github.com/wanderdust/cv-chatbot)
