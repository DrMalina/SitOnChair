# SitOnChair
A landing page for a fictional, furniture orientated company.

The project was created from scratch, based on a photo (you can check dist/img/example.jpg)
and slightly altered by me (styles, language, sections etc).

Throughout the project I tried using 7-1 Sass Pattern.

The biggest challenge I faced was styling a grid on a contact section-what was working perfectly fine on firefox 
bugged on chrome. Finally, I managed to find a solution, because the problem was with displaying grid on a fieldset in chrome (https://stackoverflow.com/questions/51076747/grid-layout-on-fieldset-bug-on-chrome). A little workaround in HTML fixed it.
Additionally, I also had a problem with JS in chrome with selecting options in custom styled select fields. Chrome struggled with
distinguishing options in clicked fields. As a result, I went with a different approach by using 'change' as an event listener.   

The RWD principals are implemented.

Any feedback appreciated :)

You can preview the website here: https://kind-einstein-16b8c8.netlify.com/ 

Enjoy! 

