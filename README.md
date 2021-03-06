# Collectr

Collectr is a fun and easy way to organize, browse, and share your most prized possesions, all in one place. Think of it as the Pinterest for collectors.

## Screenshots
![Collectr Home Page](https://github.com/MasonJinLuo/Collectr/blob/master/public/assets/images/Screenshot1.JPG)
The app presents a clean experience that makes browsing and adding posts easy.

![Collectr Social](https://github.com/MasonJinLuo/Collectr/blob/master/public/assets/images/Screenshot2.JPG)
With social features and profiles, sharing and discovering is just as simple.

## Technologies used
- Node.js
- Express.js
- Handblebars
- Bootstrap
- Animate.cs
- jQuery
- Sequelize
- MVC Codebase
- User login and authentication
- Session Management (cookie-session npm package)
- Image upload and storage (Amazon Simple Storage Service (S3))

## Getting Started

Clone the repo and follow the below commands to get a local host started.

Alternatively, you can visit [https://collectr-collections.herokuapp.com/](https://collectr-collections.herokuapp.com/) to access the app deployed to Heroku.

### Prerequisities

Run the below command to install dependencies from the package.json:

```
npm i
```

## Running the app

After installing required packages, a MySQL database must be created. Open MySQL Workbench and run the following:

```
CREATE DATABASE collectrdb;
```

## Built With

* Atom
* Sublime Text 3

## Walk throughs of code

Using the cookie-session npm package, we are able to track the user's activity once they are logged in. Any time the user makes any posts or collects a post from another user we are able to affiliate the user's information with the posts and update the database with the new post.

```
//Dependencies
var cookieSession = require('cookie-session');

...

//Sets up Express session management
app.use(cookieSession({
    name: 'session',
    keys: ['**********'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//Session Authentication

function checkAuth(req, res, next) {
	if (req.url.includes('/secure') && (!req.session || !req.session.authenticated)) {
		res.redirect('/');
		return;
	}

	next();
}

app.use(checkAuth);

//Preview uploaded image after user selects a file

    imageUpload.change(function() {
        previewFile()
    });

    function previewFile() {
        var preview = document.querySelector("#newUserImage");
        var file = document.querySelector("#imageUpload").files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    function redirectDashboard() {
        window.location = '/secure/user';
    }
});

```


## Authors

* **Angelo Florendo** - [GitHub](https://github.com/aflorend)
* **Anup Sawant** - [GitHub](https://github.com/anupsavvy)
* **Linette Hsu** - [GitHub](https://github.com/llh914)
* **Mason Luo** - [GitHub](https://github.com/MasonJinLuo)
* **Stacy Marshall** - [GitHub](https://github.com/Sam-Marshall)


## Acknowledgments

* Infinite thanks to the instructors and TAs at Northwestern's Coding Certificate Program!
* Shout outs to all the other dedicated groups and students in the class!
