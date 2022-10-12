---
title: 'VAmPI the vulnerable API for security testing'
description: ''
author: Paul Knight
summary: ''
date: '2022-10-02'
aliases:
  - vampi
usePageBundles: true
toc: true

featureImage: 'images/banner.png' # Top image on post.
thumbnail: 'images/banner.png' # Image in lists of posts.
shareImage: 'images/banner.png' # For SEO and social media snippets.

categories:
  - security
tags:
  - news
  - apis
---

Well it was one of this times where in an attempt to "fix a light bulb" a series of events lead you to do something else first. For those who do not know what I am talking about, go ahead and spend 40 seconds to watch this video.

I was trying to assess how well certain tools perform on finding vulnerabilities in APIs. In order to do that, I required a vulnerable API that could cover vulnerabilities included in the OWASP top 10 for APIs and that it would be consistent in its responses across different endpoints. Also many of the testing tools, given that we are testing APIs, they require a Swagger or OpenAPI file to be available in order to determine the endpoints, parameters, responses etc.

Long story short I was not really happy with the google results and therefore I decided to make something myself. VAmPI is written in Python using Flask and Connexion.

You can find the project in my Github here along with some details about it and some instructions on how to run it. There is no need to write here as well the endpoints found in VAmPI, feel free to either check them on the Github page or to use the Swagger Editor page supplying it with the OpenAPI file found in the project.

In this article I am going to go into a bit more detail about the locations of the vulnerabilities found in the code.

SQL Injection

In order to have an SQLi it is required to be able to pass unsanitized data to a database query. To achieve this it was mandatory to pass a query directly to the database using the execute method of the session object of the SQLAlchemy. The vulnerable code is shown below and it can be found in the models/user_model.py file in the method get_user.

user_query = f"SELECT * FROM users WHERE username = '{username}'"
query = db.session.execute(user_query)
ret = query.fetchone()


Unauthorized Password Change

In this vulnerability it is possible for an attacker to update/change the password of another user as the "developer" got mistaken in the code and instead of validating against the username from the token, the name from the URL was used! The responsible code is the following and can be found in file api_views/users.py in the method update_password.

user = User.query.filter_by(username=username).first()
user.password = request_data.get('password')
db.session.commit()


Broken Object Level Authorization

In this case the developer forgot to include the username of the user requesting a book to the query made to the database. Therefore the book along with the secret are retrieved for any user as long as she/he has a valid Bearer token. The responsible code is found in file api_views/books.py in the method get_by_title. In the next block we see the two cases where only in the second one the filter includes the fact that the user needs to have this book requested in order to retrieve it.

Vulnerable Case
book = Book.query.filter_by(book_title=str(book)).first()

Proper Case
book = Book.query.filter_by(user=user, book_title=str(book)).first()


Mass Assignment

In this vulnerability the developer has left an "open window" for a normal user to be able to register as an admin simply by passing an extra parameter at the post body. The trick is that this extra parameter is NOT in the OpenAPI specification so the "attacker" should do some guessing to figure out if the endpoint accepts only the request body as defined by the specification. This is something more known as Mass Assignment where guessing object`s properties and exploring options in endpoints is involved. The responsible code can be found in file api_views/users.py in the method register_user.


Excessive Data Exposure

One of the most often scenarios is debug endpoints being left behind as developers tend to forget about them. Usually they are not in the specifications so this means that a bit of "guessing" is required as well but in this case I have included it in the specification so it is easier to be understood. For your tests you might want to remove it from there and check if it will be found. The responsible code if found in file api_views/users.py in the method debug.


User and Password Enumeration

Sometimes APIs might be "talking" too much and reveal more than they should. In this scenario when a user attempts to login the API will respond explicitly if the username or the password are wrong allowing username and password enumeration. A proper response should be the same regardless of whether the username or the password are wrong. The responsible code is in file api_views/users.py in method login_user.


RegexDOS (Denial of Service)

When a user who has logged in attempts to update her/his email address it is possible to cause a denial of service attack when providing a malformed long email. Although this vulnerability is not a common one amongst APIs I thought it would be a good addition since it involves providing a malformed email with many characters and there will be no response from the API. It seems interesting how each api security testing tool will handle this case. The code responsible for this is in the file api_views/users.py in method update_email. The regex is shown below.

match = re.search(
                r"^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@{1}([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$",
                str(request_data.get('email')))


Lack of Resources & Rate Limiting

Finally a really common vulnerability is that there is no limitation to how many requests a single entity may perform towards an API. Limitation that we often see in the corresponding web parts are missing when we are talking directly to the APIs. An example combined attack would be to brute force the login given that we can enumerate users and then we have a clear indication when the password we provide is wrong. Given that we can try unlimited times without being interrupted brute forcing is a viable option. Further, when lacking enough resources an attacker might be able to cause a denial of service simply by spamming the API with hundreds or thousands requests per second.



Conclusion

I hope this will be useful to others as well and also feel free to share your ideas on other attacks that you might want to see included and are fit for an API. Apart from assessing how tools perform on finding the vulnerabilities, VAmPI could also be used for teaching purposes, especially given that the "fixed" code is provided as well. Simply look for the if vuln statement and you will find the not vulnerable code on the else of it. For any suggestions, questions and ideas please use the contact form.
