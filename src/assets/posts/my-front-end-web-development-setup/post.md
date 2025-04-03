---
title: "My Front End Web Development Setup"
subtitle: "An overview of my tools and workflow"
date: 2024-10-31
slug: "my-front-end-web-development-setup"
tags: "frontend"
infoPanel: {
  title: 'Intended audience',
  description: [
    'This article is for web developers looking to optimize their workflow.',
    'Whether you’re a beginner or looking to refine your current setup, this guide offers insights into the tools I use and why I prefer them.',
  ]
}
---

## **Operating System**

> The software a computer runs on.
> 

### **I use: [Windows](https://www.microsoft.com/en-us/windows)**

**Other Options:** [Linux](https://en.wikipedia.org/wiki/Linux), [macOS (Apple)](https://www.apple.com/macos/macos-sequoia/)

I use Windows for its versatility and broad compatibility with a wide range of development tools. It supports a powerful suite of applications for development, from native Windows software to Windows Subsystem for Linux (WSL), which enables access to Linux-based tools and commands directly within the OS. Windows also integrates seamlessly with popular IDEs like Visual Studio Code, and it’s well-suited for working with Docker, virtual machines, and other essential tools for web development. Additionally, Windows provides robust system management features, making it a flexible choice for both personal projects and team-based workflows.

## **Browser**

> The program used for navigating the internet.
> 

### **I use: [Google Chrome](https://www.google.com/chrome/)**

**Other Options:** [Firefox](https://www.mozilla.org/en-US/firefox/products/), [Opera](http://www.opera.com/), [Safari](http://www.apple.com/safari/) (Mac only), [Edge](https://www.microsoft.com/en-us/windows/microsoft-edge/microsoft-edge) (Windows only)

As a front end web developer, you should have all the browsers downloaded for testing. If you're using macOS, you can download virtual machines or generate screenshots of Edge at the [Microsoft Developer Tools](https://developer.microsoft.com/en-us/microsoft-edge/tools/) website.

### **Extensions**

- [Allow CORS](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) - enables CORS requests for testing APIs
- [ColorZilla](https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=it) - picks colors from any webpage element
- [CSS Stacking Context inspector](https://chromewebstore.google.com/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki) - visualizes CSS stacking contexts.
- [Grepper](https://chromewebstore.google.com/detail/grepper/amaaokahonnfjjemodnpmeenfpnnbkco) - quick code search and snippet tool
- [Fonts Ninja](https://chromewebstore.google.com/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh) - identifies fonts on any site.
- [Let's get color blind](https://chromewebstore.google.com/detail/lets-get-color-blind/bkdgdianpkfahpkmphgehigalpighjck) - simulates color blindness for accessibility checks.
- [WAVE](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) - evaluates website accessibility.
- [Postman](https://chromewebstore.google.com/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) - tests and manages API requests.
- [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en) - blocks ads and trackers

## Frontend framework

> The software bundle used for web development.
> 

### **I use: [Angular](https://angular.dev/)**

**Other Options: [React](https://react.dev/), [Vue](https://vuejs.org/)**

I prefer Angular because of its strong opinions about application architecture, which helps enforce consistent structure and practices across projects. With features like dependency injection, a comprehensive CLI, built-in form handling, and RxJS integration for managing asynchronous operations, Angular suits complex, large-scale applications that require reliability and maintainability over time. Additionally, TypeScript support out of the box enhances type safety and improves development productivity.

## **Text Editor / IDE**

> The program used to write code and edit text files.
> 

### **I use:** [Visual Studio Code](https://code.visualstudio.com/)

**Other Options:** [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/), [IntelliJ](https://www.jetbrains.com/idea/)

Visual Studio Code is my go-to because it has extensive customization options, allowing me to set up a personalized workflow. Plus, the large user community means finding help or new extensions is easy, and Microsoft’s active development keeps it up to date.

### **Extensions**

To install all extensions bring up the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of VS Code or the View: Extensions command **`Ctrl+Shift+X`**.

- **Auto Close Tag** - automatically closes HTML tags as you type.
- **Auto Rename Tag** - renames paired HTML tags simultaneously.
- **Better Comments** - improves comment readability with color-coded tags.
- **Better CSS Stacking Context** - highlights CSS stacking contexts in code.
- **Colorize** - displays color previews for color codes in CSS files.
- **Copy JSON Path** - easily copies JSON paths for data traversal and referencing.
- **Error Lens** - highlights and annotates errors and warnings directly in the code editor.
- **Git Lens** - enhances Git capabilities with history insights, blame annotations, and more.
- **Paste and Indent** - automatically adjusts indentation when pasting code.
- **Path Intellisense** - offers path autocompletion for files and directories in import statements.
- **Peacock** - customizes the VS Code workspace color to differentiate between projects.
- **Prettier** - formats code automatically for clean, consistent styling.
- **Project Manager** - enables quick switching and organizing of multiple projects.
- **SVG Preview** - renders previews of SVG files directly in the editor.

### **Configuration**

How to open VsCode settings.json? -> COMMAND + , Then scroll to Extensions -> Edit in settings.json & Replace with below code. 

```json
{
    "window.zoomLevel": 1,
    "editor.tabSize": 2,
    "css.lint.important": "warning",
    "scss.lint.important": "warning",
    "editor.cursorBlinking": "phase",
    "markdown.preview.scrollEditorWithPreview": true,
    "markdown.preview.scrollPreviewWithEditor": true,
    "workbench.startupEditor": "none",
    "workbench.sideBar.location": "right",
    "workbench.colorTheme": "Monokai Pro",
    "workbench.iconTheme": "Monokai Pro Icons",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "javascript.updateImportsOnFileMove.enabled": "always",
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}
```

## **CSS Preprocessor**

> Extend the features of CSS and compile it back into CSS.
> 

### **I use: [Sass](http://sass-lang.com/)**

**Other Options:** [LESS](http://lesscss.org/), [Stylus](http://stylus-lang.com/)

A preprocessor is a program that takes a bit of code and compiles it into a different bit of code. In the case of CSS preprocessors, we’re compiling the Sass language into regular CSS that the browser can interpret. I like having the ability to define variables, nest, create loops, and organize my project into multiple files, all of which and more I can do with Sass, specifically the **`.scss`** extension.

## **CSS Framework**

> A base stylesheet used as a starting point for designing a website.
> 

### **I use: [Tailwind](https://tailwindcss.com/)**

**Other Options:** [Bootstrap](http://getbootstrap.com/), [Foundation](http://foundation.zurb.com/)

I prefer Tailwind CSS for its utility-first approach, which lets me apply small, single-purpose classes directly in HTML without writing custom CSS for every design element. This results in quicker styling and cleaner, more maintainable code. Tailwind also enables responsive design out of the box, so building flexible layouts is simple, and I can customize styles to fit each project’s unique needs without worrying about conflicting stylesheets.

### **Miscellaneous**

A few other programs I use on a regular basis.

- [Notion](https://www.notion.so/) - for note taking, synced accross multiple devices.
- [Postman](https://www.postman.com/) - for testing APIs, saving environments and creating tests.
- [Figma](https://www.figma.com/) - a collaborative design tool for creating prototypes and wireframes.


## **Conclusion**

Web development’s got a lot of moving parts, and everyone’s setup looks a little different. What I’ve shared here is just what works best for me, from OS choice to the last touches on performance and analytics. There’s no one-size-fits-all answer, though—it’s all about finding the right tools that click with your style and workflow.

The tech landscape is always shifting, so being willing to try new tools, tweak your process, and learn as you go is key. Hopefully, this rundown sparks some ideas for building out your own setup, or maybe helps you find a tool you hadn’t thought of. Whatever works for you, embrace it, and keep leveling up!