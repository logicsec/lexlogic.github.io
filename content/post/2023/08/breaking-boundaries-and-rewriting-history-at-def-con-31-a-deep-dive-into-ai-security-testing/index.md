---
draft: true
news_post: false
author:
  - paul-knight
title: "Breaking Boundaries and Rewriting History at DEF CON 31: A Deep Dive
  into AI Security Testing"
date: 2023-08-16T15:15:32.999Z
featured: true
usePageBundles: true
featureImage: /images/thumbnail.jpg
thumbnail: /images/thumbnail.jpg
shareImage: /images/thumbnail.jpg
codeLineNumbers: true
codeMaxLines: 10
figurePositionShow: true
showRelatedInArticle: true
tags:
  - Vulnerabilities
categories: Risk & Compliance
---
Attending DEF CON 31 was more than just an event on my calendar—it was an experience that brought me face-to-face with the intricate world of artificial intelligence. As someone keen on understanding the depths of technology, this was the perfect opportunity to challenge and interact with some of the most cutting-edge AI systems available.

The anticipation began even before entering the dedicated testing room. A lengthy line formed outside, with each participant eagerly waiting their turn, exchanging theories and speculations about what lay ahead. Upon entering, a sense of gravity immediately hit. We were all handed NDAs to ensure the confidentiality of specific vulnerabilities of the participating vendors. But within the constraints of the NDA, general discoveries and learnings could be shared—a subtle nod to the importance of community learning in the realm of cybersecurity.

The list of participating companies read like a who's who of the tech world: OpenAI, NVIDIA, Google, Meta, Anthropic, HuggingFace, and a few lesser-known but equally formidable entities. Intriguingly, in a bid to make the testing more challenging and perhaps to infuse a bit of humor, these AI models were tagged with names from the periodic table.

With a timer set for 50 minutes, the testing was both intense and exhilarating. I soon found myself delving deep into the vulnerabilities of these AI behemoths.

**Unmasking the Hidden: De-anonymizing AI Models**\
In the midst of my testing, I managed to exploit a vulnerability that led to the unmasking of an AI's true identity. Originally concealed behind pseudonyms, through some methodical probing and observation, patterns emerged which allowed me to determine its lineage, parent company, and even details about its most recent update. This discovery emphasized the significance of refining AI response patterns to prevent inadvertent leaks of confidential information.

**Rewriting the Past: Manipulating AI's Perception of History**

Another striking finding was my ability to manipulate an AI's understanding of historical facts. By feeding it deceptive information, I convinced the system that I was the third president of the United States. The seriousness of this vulnerability extended beyond simple misinformation. Once its understanding was skewed, the AI refused to accept correct inputs. Rectifying this required engineers to perform a full server reset, spotlighting the risks AI might pose if manipulated on a grand scale and the necessity for robust validation mechanisms.

Post-testing, the learning didn’t stop. I had a chance meeting with a representative from the Chief Digital and Artificial Intelligence Office of the US Department of Defense. Our conversation spanned a wide spectrum—from the overarching trajectory of AI to the vulnerabilities and challenges laid bare during the day's session. We delved deep into potential solutions, emphasizing the importance of continued research, collaboration, and the ethical responsibilities that come with AI's immense power.

To wrap up, DEF CON 31 was more than just a test of skills. It was a testament to how far AI has come and, more importantly, an indicator of the vast expanses it has yet to cover. As technology continues to grow and evolve, experiences like this serve as a vital reminder of the importance of diligence, curiosity, and a commitment to ethical considerations in the digital realm.