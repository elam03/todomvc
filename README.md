# Rainbow - Frontend Take-Home Assignment

Please create a private fork of this repo, complete the objectives.
Once you are finished, send us an email with a link to your private repo.

## To Create A Private Fork

1. Clone the repository to your local machine
```bash
git clone git@github.com:rainbowmga/todomvc.git
cd todomvc
```

2. Create a new private repository on your GitHub account (go to https://github.com/new,
select "Private").

3. Add your new private repo as a remote:
```bash
git remote rename origin upstream
git remote add origin https://github.com/YOUR_USERNAME/NEW_PRIVATE_REPO.git
```

4. Push the code to your new private repo:
```bash
git push -u origin master
```


## To Run The App

1. Install dependencies
```bash
yarn install
```

2. Start the app at localhost:3000/
```bash
yarn dev
```

What you will see is a rather incomplete version of a TODO web app, where
you can only type into a textbox and clear the textbox when you hit enter.

![Demo](https://github.com/rainbowmga/todomvc/blob/master/assets/starter_demo.gif)


## The Assignment

This incomplete TODO app is actually an incomplete version of an open source
project, [TodoMVC](https://todomvc.com/). There are actually demoable examples
in that project site that shows what a complete version of the app looks like (i.e.
[jQuery implementation](https://todomvc.com/examples/jquery/dist/#/all))

The assignment is to first finish our incomplete skeleton of TodoMVC, and then
add a few extensions on top of the TodoMVC. Note that this repo draws from a
boilerplate implementation, so feel free to refactor the code to improve it.


### Objective 1: Finish The Implementation

Specifically, the repo provides implementations of the individual components, but
does not include global state management. Additionally, some components may contain
minor bugs. So, don't assume the components are complete or bug-free — you may need
to modify them. Your goal is to finish the TodoMVC implementation. You're encouraged
to reference existing implementations (excluding source code) to understand the
expected functionality.

Once you're done, the implementation should behave exactly the same way as the examples
on [TodoMVC](https://todomvc.com/).


### Objective 2: Undo/Redo

Include undo and redo buttons in the footer. These buttons should enable a user to
undo and redo changes that the user has made while interacting with the app.


## Turning In A Solution

Before submitting your solution, please include documentation outlining the reasoning behind
your changes — such as a changelog or updates to the README.md. In the follow-up interview,
we'll likely ask about your design decisions and implementation choices, so having your
thoughts documented in advance will be helpful.

Once you're finished, please send us an email with a link to your private repo so we can
access and review it.


## Assumptions

You should be able to complete this assignment without importing any additional dependencies.

We expect you to work on this task as if it was a normal project at work. So please write
your code in a way that fits your intuitive notion of operating within best practices.

We recommend making separate commits for each objective to help illustrate how you approached
and broke down the assignment.  Don't hesitate to commit work that you later revise or remove
— it's valuable to see your process evolve over time.

Parts of this assignment are left intentionally ambiguous. How you resolve these
ambiguities will help us understand your decision-making process.

However, if you do have questions, don't hesitate to reach out!
