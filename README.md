Memory Lane

The purpose of the Memory Lane app is to provide a place for users to tell stories about the streets on which they lived. I've always been curious about the history of those places that I've resided from the perspective of past, present, and even future neighbors.

Technologies used include: HTML, CSS, JavaScript, Node.js, Mongo, as well as node packages such as those listed in my package.json.

Approach began with passport. Because this was the element that I understood the least, I heavily borrowed from our Passport lesson, typing in all of that code, making appropriate changes along the way.

Unsolved problems include the display of a username with a story, as well as a profile page for each user, showing their profile info and stories contributed.



#### Requirements

Your app must:

* **Have at _least_ 2 models** (more if they make sense) – one representing someone using your application, and one that represents the main functional idea for your app

>My user model and the story model allow user profiles to be created, and for stories to be created.


* **Interface** with a 3rd Party Web API of your choosing

>I chose Google Maps Javascript API as my 3rd party API.


* **Include sign up/log in functionality**, with encrypted passwords & an authorization flow

>The combination of '/signup' and '/login', as well as the implementation of the passport library allow users to sign up, log in, and do so with encrypted passwords.


* **Have complete RESTful routes** for at least one of your resources with GET, POST, PUT, and DELETE

>My /controllers/users.js file demonstrates each of these RESTful routes.


* **Utilize Mongo to create a database structure** and interact with your JSON-like data

>Mongo has been a great db for this project, allowing me to get new and existing data to display.


* **Include wireframes** that you designed during the planning process

>https://app.moqups.com/mwierenga/pxHfUIKpyi/edit/page/ad64222d5


* Have **semantically clean HTML and CSS**

>>>>>>>>>>


* **Be deployed online** and accessible to the public

>A public presence of this app can be found at https://shielded-garden-70117.herokuapp.com/


---

#### Necessary Deliverables

* A **working full-stack application, built by you**, hosted somewhere on the internet

>This app is hosted at https://shielded-garden-70117.herokuapp.com/


* A **link to your hosted working app** in the URL section of your GitHub repo

>I'm not sure what this is.


* A **git repository hosted on GitHub**, with a link to your hosted project,  and frequent commits dating back to the **very beginning** of the project. Commit early, commit often.

>https://github.com/micahwierenga/memory-lane-app



* **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

>See above.


* **Wireframes of your app**, hosted somewhere & linked in your readme
* A link in your ``readme.md`` to the publicly-accessible **user stories you created**

>https://app.moqups.com/mwierenga/pxHfUIKpyi/edit/page/ad64222d5
