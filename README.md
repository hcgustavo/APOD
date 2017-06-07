# NASA's Picture of the Day
Each day a different picture of our universe<br>
https://nasapod.herokuapp.com/

What it is
--------------
**NASA's Picture of the Day** is a website that shows each day a different image or picture of our beautiful universe chosen by
NASA itself.<br>
It is also possible to have access to the media archive by choosing a specific date from the date picker input located on the
center top of the home page.

How it works
--------------
The website uses an API called APOD (Astronomy Picture of the Day) provided by NASA to get the media data.<br>
By making a HTTP request, the website gets as response, in JSON format, some information on the media like: url of the media,
description, title, type and copyright information.<br>
To know more about the APOD API, please NASA's Open APIs website: https://api.nasa.gov/api.html#apod

Development
--------------
**NASA's Picture of the Day** was developed in HTML5 and Javascript, using Bootstrap and jQuery for most of the front-end design
and programming of the functionality.
