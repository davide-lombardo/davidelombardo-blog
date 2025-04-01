import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('terminalInput') terminalInput!: ElementRef;
  @ViewChild('terminalOutput') terminalOutput!: ElementRef;
  @ViewChild('welcomeMessage') welcomeMessage!: ElementRef;

  commandHistory: { command: string; response: string }[] = [];
  historyIndex: number = -1;
  tempInput: string = '';

  availableCommands = {
    help: 'Display available commands',
    about: 'Learn more about me',
    ls: 'List sections of the website',
    cd: 'Navigate to a section (usage: cd [section])',
    home: 'Go back to home page',
    projects: 'View my projects',
    articles: 'View my articles',
    contact: 'Get my contact information',
    clear: 'Clear the terminal screen',
    theme: 'Toggle between light and dark theme',
    skills: 'List my technical skills',
    socials: 'Display my social media links',
    sloth: 'An Easter egg for sloth lovers!',
  };

  constructor(private router: Router, private themeService: ThemeService) {}

  ngAfterViewInit(): void {
    this.animateWelcomeMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.terminalOutput.nativeElement.scrollTop =
        this.terminalOutput.nativeElement.scrollHeight;
    } catch (err) {}
  }

  executeCommand(input: string): void {
    const command = input.trim().toLowerCase();
    let response = '';
    this.historyIndex = -1;
    this.tempInput = '';

    switch (command) {
      case 'help':
        response = this.getHelpText();
        break;
      case 'about':
        response = `I'm a frontend developer based in Italy who loves building cool web stuff.
          I specialize in TypeScript and Angular development.`;
        break;
      case 'ls':
        response = `Available sections:
          - home
          - articles
          - projects
          - about-me`;
        break;
      case 'home':
        this.router.navigate(['/']);
        response = 'Navigating to Home...';
        break;
      case 'projects':
        this.router.navigate(['/projects']);
        response = 'Navigating to projects...';
        break;
      case 'articles':
        this.router.navigate(['/posts']);
        response = 'Navigating to articles...';
        break;
      case 'clear':
        this.commandHistory = [];
        return;
      case 'theme':
        this.themeService.toggleTheme();
        response = 'Toggling theme...';
        break;
        case 'skills':
          response = `Technical Skills:
          - Frontend: TypeScript, JavaScript, Angular, React, HTML, CSS, Sass
          - State Management: Redux, Ngrx, RxJS
          - Backend & DB: Node.js, Express, MongoDB, PostgreSQL
          - DevOps & Tools: Git, Docker, Linux, Bash
          - Design: Figma`;
        break;
      case 'socials':
        response = `Find me on:
        - GitHub: <a href="https://github.com/davide-lombardo" target="_blank">github.com/davide-lombardo</a>
        - LinkedIn: <a href="https://www.linkedin.com/in/lombardo-davide/" target="_blank">linkedin.com/in/lombardo-davide</a>`;
        break;
      case 'sloth':
        response = '🦥 Slow and steady wins the race! Take it easy!';
        break;
      default:
        if (command.startsWith('cd ')) {
          const section = command.substring(3).trim();
          switch (section) {
            case 'about-me':
              this.router.navigate(['/about-me']);
              response = 'Navigating to about me...';
              break;
            case 'projects':
              this.router.navigate(['/projects']);
              response = 'Navigating to projects...';
              break;
            case 'articles':
            case 'posts':
              this.router.navigate(['/posts']);
              response = 'Navigating to articles...';
              break;
            case 'home':
              this.router.navigate(['/']);
              response = 'Navigating to Home...';
              break;
            default:
              response = `cd: ${section}: No such section`;
          }
        } else {
          response = `Command not found: ${command}. Type 'help' to see available commands.`;
        }
    }

    this.commandHistory.push({ command, response });
    setTimeout(() => {
      this.terminalInput.nativeElement.focus();
    }, 0);
  }

  getHelpText(): string {
    let helpText = 'Available commands:\n';
    for (const [cmd, desc] of Object.entries(this.availableCommands)) {
      helpText += `- ${cmd.padEnd(10)} ${desc}\n`;
    }
    return helpText;
  }

  animateWelcomeMessage(): void {
    const welcomeMessageElement = this.welcomeMessage.nativeElement;
    const welcomeMessages = [
      'Welcome to my terminal. Type \'help\' to see available commands.',
    ];

    welcomeMessages.forEach((message, index) => {
      const paragraph = welcomeMessageElement.children[index] as HTMLElement;
      let msgIndex = 0;
      const typingInterval = setInterval(() => {
        if (msgIndex < message.length) {
          paragraph.innerText += message.charAt(msgIndex);
          msgIndex++;
        } else {
          clearInterval(typingInterval);
          paragraph.classList.add('finished');
          if (index === welcomeMessages.length - 1) {
            this.terminalInput.nativeElement.focus();
          }
        }
      }, 40);
    });
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      if (this.historyIndex < this.commandHistory.length - 1) {
        if (this.historyIndex === -1) {
          this.tempInput = this.terminalInput.nativeElement.value;
        }
        this.historyIndex++;
        this.terminalInput.nativeElement.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex].command;
      }
    } else if (event.key === 'ArrowDown') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.terminalInput.nativeElement.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex].command;
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.terminalInput.nativeElement.value = this.tempInput;
      }
    }
  }
}
