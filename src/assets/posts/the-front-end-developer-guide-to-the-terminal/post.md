---
title: "The Frontend Developer Guide To The Terminal"
subtitle: ""
date: 2024-11-02
slug: "the-front-end-developer-guide-to-the-terminal"
tags: "git"
---


Modern front-end frameworks like React, Angular, and Vue rely heavily on the terminal. If you're not comfortable with command line interfaces, you'll struggle to run a local development server or build your application!

It takes years of practice to become a terminal expert, but we can take a shortcut. We don't really need to know 98% of the stuff you can do with a terminal. If we focus on the most-important critical fundamentals, we should be able to become comfortable with the command line in a short amount of time. ✨

I'll also share all of my favourite *tips and tricks* for getting the most out of the terminal, the stuff I wish someone had shown me when I was first getting started.

## Getting set up

Alright, so there's two things we need to do before anything else.

First, we need some terminal software. This is the application that runs the command-line environment.

Just about every operating system will come with a built-in terminal, like MacOS' Terminal.app, or Windows' Command Prompt. These applications work, but they're pretty underwhelming. Most developers opt to use something else.

The choice of terminal application isn't *super* important, as long as you're using something modern. That said, I have three main recommendations:

1. [Hyper](https://hyper.is/) is a modern, multi-platform terminal application. It's beautiful, and comes with some handy modern features, like the ability to split into multiple panes.
2. [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?hl=it-it&gl=IT) is a feature-rich terminal application for Windows, designed to enhance the command-line experience for users working with various shells, such as PowerShell, Command Prompt, and Windows Subsystem for Linux (WSL).
3. If you use VS Code as your code editor, VS Code comes with a powerful, modern terminal built in. This is nice, since it means your code and terminal can run side-by-side in the same application. You can pop open the terminal in VS Code by selecting View → Terminal.

I'll be using Hyper for all the examples in this blog post.

Now, the terminal application is only half of the equation. We also need to make sure we're running the right *shell language*.

When we type a command into the terminal and press “enter”, that command will be interpreted by the shell language. It's essentially the environment running within the terminal application.

The most popular shell language is **Bash**. When you see command-line instructions online, it's likely that the instructions are assuming Bash. This is the default shell language used by most Linux distributions.

Modern MacOS versions ship with **Zsh** instead of Bash, but Zsh is very similar: it's part of the same "family", and shares almost all of the same commands. For our purposes, they can be used interchangeably.

If you're using either Linux or MacOS, you're good to go. Your computer is already using an "industry standard" shell language. If you're using Windows, however, we have a bit of work to do.

### Windows setup

Bash is a Linux-based shell language, and it won't run natively in Windows. Fortunately, newer versions of Windows come with the ability to install and run Linux as if it were any other application. This is known as *Windows Subsystem for Linux*, commonly abbreviated to WSL.

Here's a tutorial that runs through the steps required: [How to install and use Zsh in Windows 10](https://candid.technology/zsh-windows-10/).

I ran through these steps myself, and while it's definitely a bit tedious, it does the job!

Once it's set up, you'll be able to configure your terminal application to use Bash or Zsh. Here are some instructions for [configuring Hyper to use Zsh](https://hashnode.com/post/customize-hyper-terminal-in-windows-using-oh-my-zsh-and-powerline-fonts-ckggfmcwc00brrls1f8va9jfl#install-hyper-terminal).

If you have trouble with any of these steps, there are other solutions you can try. A popular method is [Git Bash](https://www.atlassian.com/git/tutorials/git-bash), which allows you to run Bash within Windows using emulation.

Ultimately, it doesn't matter how you get there. The important thing is for you to be able to use either Bash or Zsh within Windows.

## Hello World

When you first open the terminal application, you're met with this rather unhelpful interface:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/empty.png)

Your terminal will likely look a bit different, based on your operating system / terminal application / shell language. Ultimately, however, you'll probably be looking at a single line of text, and a bunch of empty space.

The single line of text is known as a *prompt*. It's called a “prompt” because it's waiting for you to provide some sort of instruction.

For our first command, enter the text `echo "hello world"` and press enter:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/echo.png)

The syntax is a bit different, but you can think of commands like built-in JavaScript functions. The `echo` command is very similar to the `console.log` function in JavaScript.

Like functions, commands take arguments. In this case, `echo` takes a single argument, the string to output.

When we press “enter”, the command is immediately executed, and our value is logged. A fresh prompt is rendered below, to let us know that it's ready to receive the next instruction.

And just like that, you've run your first terminal command!

## Navigation

The main purpose of a terminal is to enable you to move around the file system and open/run things. It's essentially a text-based version of the GUI file explorers we use every day (eg. Finder, Windows Explorer).

To help us navigate around, there are lots of terminal commands we can use. Let's explore some of them.

The `pwd` command stands for “Print Working Directory”, and it's sorta like the "You are here" arrow on shopping mall directories. It tells you where you are right now:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/pwd.png)

When you open the terminal application, you're generally tossed into the "home" directory, the one that contains the Documents and Desktop directories. On my particular machine, this directory is located at `/Users/YOUR_USERNAME`.

You can see the contents of the current directory using the `ls` command (short for “List”):

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/ls.png)

In my particular terminal, directories are bold and written in a light aqua color, while single files are regular weight and written in white.

We can move around the file system with the `cd` (“Change Directory”) command:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/cd.png)

This is equivalent to double-clicking the test directory in a GUI file explorer.

What if I want to go up one level, back to the home directory? I can use the `cd` command for this as well, with two dots (`..`).

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/go-back.png)

The dot character (`.`) has a special meaning in most shell languages:

- A single dot (`.`) refers to the *current directory*.
- Two dots (`..`) refer to the *parent directory*.
    
If you've worked with module systems in JavaScript, you're probably already familiar with this convention. It uses the same notation, using two dots to refer to the parent directory:


```javascript
import { COLORS } from '../../constants';
import Button from '../Button';
```

One important thing to know about `cd` is that it can take complex paths. Terminal beginners will often go one step at a time, like they would in a GUI file explorer:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/cd-2.png)

This works, but it's a lot of extra work. We can make the same jump in a single step like this:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/cd-3.png)

### Tab auto-completion

One of the most intimidating things about the terminal is that it doesn't give you any clues or hints. With a GUI file explorer, you can see a full list of files and folders, to refresh your memory and help you find what you're looking for.

If you want to use `cd` as I propose, leaping from 1 spot to another in a single bound, it might seem like you'd need a photographic memory. You can't do it unless you remember the exact name of every directory in the chain, right?

Fortunately, an incredibly-handy trick makes this much easier: *tab autocompletion*.

The Tab key is critically important when it comes to using the terminal effectively. In addition to the navigation tricks shown here, we can also use Tab to auto-complete Git branches, or fill in the rest of a command.

Try pressing Tab in different circumstances, and see what happens!

## Flags

Earlier, I said that commands in Bash/Zsh are like functions in JavaScript. The analogy breaks down a bit when it comes to *flags*.

Flags are modifiers that tweak the behaviour of commands in predefined ways.

For example, let's look at the `rm` command. This command allows us to delete individual files:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/rm.png)

We don't get any sort of confirmation, but if we check, the `example.png` file has indeed been deleted.*

**Proceed with caution!**
Before we go any further, I should warn you: terminals can be pretty unforgiving.
The `rm` command doesn't have an "Are you sure?" confirmation prompt. And there's no undo. When you delete a file with `rm`, it doesn't go to the recycle bin / trash can. It's **permanently and irrevocably deleted**.*
This is a common theme with the terminal. There aren't many safety mechanisms. So please, **be very careful when using commands like “rm”!**

If you try and use the `rm` command on a directory, you'll get an error:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/rm-error.png)

By default, `rm` can only remove individual files, but we can change this rule with the `r` flag:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/rmr.png)

The `r` flag stands for “recursive”. It will delete everything inside the `test` directory, anything inside the directories inside the `test` directory, anything inside directories inside the directories inside the `test` directory, and so on.*

You might also run into some file permission issues. For that reason, the `f` flag (Force) is commonly used as well. We can group multiple flags with a single dash, like this:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/rmrf.png)

Flags take many shapes and sizes. By convention, it's common for flags to have a short form (eg. `-f`) and a long form (`--force`). The long form typically uses two dashes, and uses whole words instead of individual letters.

Let's look at one more example. the `ls` command we saw earlier is commonly called with two flags:

- The `l` flag, “long”, which prints the directory contents in a detailed list with metadata.
 
- The `a` flag, "all", which'll include hidden files and directories.
    
    
This changes the output considerably:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/lsla.png)

There's a lot of noise here, including the ridiculously-obfuscated permission glyphs. But some of the metadata, like the dates that show when a file was last updated, can be useful!

## Interrupting commands

Some processes are long-running, and will need to be interrupted.

For example, open your terminal application and try running the following command: `ping 8.8.8.8`.

The `ping` command will check the latency against a given IP address. It's useful for checking whether a given server is online or not. `8.8.8.8` is the IP address for Google's DNS server.

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/ping.png)

Unlike the commands we've seen so far, `ping` is a long-running process. It never stops; by default, it'll keep pinging Google's DNS server until the end of time.

When we're satisfied with the results, we can interrupt it by holding `ctrl` and pressing `c`. Even on MacOS, where most shortcuts use the `⌘` modifier, we use `ctrl`.

Another helpful command is `ctrl` + `d`. This will end the current session. If `ctrl` + `c` isn't working for some reason, `ctrl` + `d` may work instead.

Finally, if all else fails, you can close the current tab/window. The shortcut depends on the OS and terminal application. Using Hyper on MacOS, this is done with `⌘` + `w`.

## Common development tasks

So far, we've seen lots of general-computing examples of how to do stuff with the terminal. Let's look at how we'd accomplish some typical development tasks!

These examples assume that you have Node.js installed. If you haven't installed it yet, you can [download a copy from the Node homepage](https://nodejs.org/en/).

### Managing dependencies

Let's imagine it's your first day on the job. The team has given you access to the source code, and you've downloaded it onto your machine. Now what?

Well, the first step is to download the project's third-party dependencies!

Here are the steps to follow:

```javascript
$ cd path/to/project$ npm install
```

npm stands for Node Package Manager. It's installed automatically when you install Node.js.

Running this command will download all of the third-party code that the project depends on from the NPM repository. This code will live in a local `node_modules` directory.

### Running NPM scripts

Alright, so you've got the third-party code downloaded. Now what?

If you check out the project's `package.json`, you'll likely see a section that looks like this:

```javascript
{  
    "scripts": {    
        "start": "react-scripts start",    
        "build": "react-scripts build",    
        "test": "react-scripts test",    
        "eject": "react-scripts eject"  
    }
}
```
These “scripts” are tasks that can be run with the NPM utility. They can be executed by running `npm run [name]`. For example, to boot up a local development server, we'd run:

```javascript
$ cd path/to/project
$ npm run start
```

Running this command starts a long-running process. It launches a Node server that allows us to work on our application, watching for changes to the files and re-bundling when we edit them.

When we're done, we can kill the server with `ctrl` + `c`.

The beautiful thing about NPM scripts is that they *standardize* things. `start`, `build`, and `test` are conventional names for these standard tasks. As a result, we don't have to memorize bespoke commands for each project, even if the projects use radically different tools.*


### Opening the project in your IDE

When I want to start working on a project, I start by navigating to the project's root directory in the terminal. Then I run the following command:

```javascript
$ cd path/to/project$ code .
```

As discussed, `.` refers to the current working directory. `code` is a command added by my code editor, VS Code. Running this command opens the entire project in my code editor, making it easy for me to jump between files as-needed.

Note that the command will vary depending on your editor. And, for folks on MacOS who use VS Code, you'll need to [do a bit of work](https://code.visualstudio.com/docs/setup/mac) to enable the `code` command.

### Reinstalling dependencies

You know how the standard advice for *any* computer problem is to turn it off and on again?

The JavaScript version of that is to reinstall the NPM dependencies. Sometimes, they just need to be erased and re-downloaded. This is *especially* true if you occasionally pop into your `node_modules` and edit the files to help with debugging.*

Here's how we can do this:

```javascript
$ cd path/to/project$ rm -rf node_modules
$ npm install
```

Once we're in the correct directory, we delete all third-party code with the `rm` command, and then re-install it with `npm install`.

### Working with Git

While there *are* GUI applications for working with Git, many developers prefer to use the command line for Git-related tasks.

A full command-line Git tutorial is well beyond the scope of this blog post, but here's a quick cheat-sheet of the commands I use often:

```javascript
#​ Download a Git repository onto your local machine$ git clone [URL]
#​ Check which files have been modified$ git status -s
#​ View changes$ git diff#​ Stage all files$ git add .
#​ Commit staged files$ git commit -m "Short descriptive message"
#​ Create a new local branch$ git switch -c [new branch name]
#​ Switch branches$ git switch [branch name]
#​ Push your code to Github (or wherever the project lives)$ git push origin [branch name]
#​ Start an interactive rebase$ git rebase -i [branch name or commit hash]
```

## Tricks

Over the years, I've picked up some nifty little terminal tips. They aren't *critical*, but they help improve the developer experience of using the terminal.

### Cycling commands

Many terminal applications will keep a log of every command you've run in a given session. You can cycle through previous commands using the "up" arrow.

If I know I've run a command recently, it's usually faster to hit "up" a couple times rather than typing it out from scratch!

### Clearing the terminal

Like a clear desk, a clear terminal can lead to a clear mind.

There are a few ways to accomplish this. There's a `clear` command, which will erase all previously-entered commands, and making it seem like you just started a new terminal session.

There's also a universal shortcut, `ctrl` + `L`. This has the same effect as the `clear` command. It should work across MacOS, Windows, and Linux.

This command/shortcut is implemented within Bash/Zsh. It's part of the shell environment. This means that it only works while the shell is idle, when you have a prompt waiting to receive instructions.

Certain terminal applications also implement their own shortcuts, and these shortcuts can work **even while the shell is busy.** Here are the list of shortcuts I'm aware of:

- On MacOS, across just about any shell (Terminal.app, iTerm2, Hyper), the shortcut is `⌘` + `k`
- If you use Hyper on non-MacOS platforms, the shortcut is `ctrl` + `shift` + `k`.
    

**These application-level shortcuts are way better.** You can use them even when the shell is busy.

For example, let's say you're running a dev server. This is a long-running process, and so the `ctrl` + `L` shortcut won't work. As you work on the project, lots of messages will be logged in the terminal window. The application shortcuts allow you to clear away stale logs, as if archiving old emails. **This is really helpful,** and a great example of how modern terminal applications make our lives easier.


### Switching to a GUI file explorer

Unless you've reached black-belt status with the terminal, there will be times when you want to open the working directory in a GUI file explorer.

On MacOS, the `open .` command will do this:

The `open` command is generally used to open a file, the same way double-clicking a file opens it in a GUI file explorer.

When we try to open a *directory*, however, it'll choose to pop open a new Finder window, showing the contents of that directory.

And since the dot character (`.`) refers to the current directory, `open .` allows us to switch from the terminal to Finder, to continue our work outside of the terminal.

On Windows, you can use `explorer .` to accomplish the same goal!

### Chaining commands

Whenever I clone a new project from Github, I generally want to do two things in a row:

- `npm install`, to fetch third-party dependencies
- `npm run start`, to boot up a local development server
    

The `npm install` command typically takes a few minutes. I don't have the attention span to sit and watch dependencies download, and so I'll often distract myself with Twitter. The next thing I know, 20 minutes have passed, and I totally forgot I was going to start a dev server. 😬

We can solve this problem using *chaining*. Here's how it works:

![Screenshot](./assets/posts/the-front-end-developer-guide-to-the-terminal/chaining.png)

The `&&` operator allows us to chain multiple commands together. The first command will be executed, `npm install`. The moment it finishes, the second command will be run automatically.

This is a particularly neat trick because `npm run start` generally opens a browser window, capturing my attention and letting me know that everything's ready for me. `npm install`, by contrast, finishes silently.

Once I got the hang of chaining, I started using it everywhere. I'll often queue up a bunch of Git commands:

```javascript
git add . && git commit -m "Stuff" && git push origin main
```

## Conclusion

The terminal has a well-earned reputation for being intimidating and tricky for beginners. It's totally normal if you struggle with it!

Hopefully, though, this blog post has at least cut down the scope of what you need to learn!

