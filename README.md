# Anonymously Reporting Tool
Anonymously Reporting is a tool that provides an app that makes users send feedback, reports harassment/bias, or asks a question anonymously to the app's publisher. Those in need to have a tool that will allow their employees to send feedback, report harassment/bias, or ask a question anonymously, can download the source code. 

<!-- [If you want to get more information about the implementation click here.](#implementation-for-companies "If you want to get more information about the implementation click here.") -->

* Demo `WIP`
* Why `WIP`
* [How does it work?](#how-does-it-work "How does it work?")
	* [Case Creation Dataset](#case-creation-dataset "Case Creation Dataset")
* [How will it be anonymous?](#how-will-it-be-anonymous "How will it be anonymous?")
* Diversity & Inclusive `WIP`
* [Final Concept](https://miro.com/app/board/o9J_lW60VQs=/ "Full Concept")
* [Final Design](https://www.figma.com/file/TquNrHQ9d4TlC0z6DWeGbO/Untitled?node-id=13%3A159 "Full Design")
* Implementation For Companies `WIP`
* [Acknowledges](#acknowledges "Acknowledges")

## How does it work?
The tool doesn't need any personal data (e.g., name, surname, e-mail, phone number) to send feedback, report a harassment/bias, or ask a question. Instead of getting personal data from the user, tool receives only [case related details](#case-creation-dataset "Case Creation Dataset"). It automatically creates an anonymous user to assign the case, then shares this username and password with the user before completing the case report process.

### Case Creation Dataset
Here is what app receives to create a new case.

| Data | Options |
| ------------ | ------------ |
| Feedback Type | `General, feedback or questions` <br> `Culture Issues` <br>`Harassment or Bias`<br> `Diversity, equity, and inclusion` |
| Did this happen to you or some else? <br> `optional` | `Me` <br> `Someone else` |
| Relationship to the company <br> `optional` | `Current Empoyee` <br> `Former Employee` <br> `I interviewed there.` <br> `I had a parnership relations with this company.` |
| When did this happen? | `1-6 months` <br> `6-12 months` <br> `1 year ago`  <br> `I don't remember`  |
| Which city did this happen?  | `All cities can be selected.` |
| Which department did this happen? | Free text area |
| Detailed Message | Free text area  |
| Attachments | Free file area (max 3 per time)  |

## How will it be anonymous?
The tool doesn't need [any personal data (e.g., name, surname, e-mail, phone number)](#how-does-it-work "How does it work?"). Instead, generates a unique/anon username & password before completing the case report process to show anon username and password to the user. The user must protect this anon username and password to log in to the app, which makes it possible for the user to follow their case's further updates. After the user gets the anon user info, the app encrypts and saves it to the database. Afterward, even a developer can't see the actual username and password after the case report process. 

# Acknowledges
* Thanks to [Caner Elbeli](https://www.linkedin.com/in/caner-elbeli-87440819a/ "Caner Elbeli") to create such an amazing design for the tool.

