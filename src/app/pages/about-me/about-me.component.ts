import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Education, Experience, Skill } from '../../models/about-me.model';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NgClass, ContainerComponent, HeroComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(135deg)' })),
      transition('collapsed => expanded', [
        animate('300ms ease-in-out', keyframes([
          style({ transform: 'rotate(45deg)', offset: 0.3 }),
          style({ transform: 'rotate(90deg)', offset: 0.6 }),
          style({ transform: 'rotate(135deg)', offset: 1.0 })
        ]))
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in-out', keyframes([
          style({ transform: 'rotate(90deg)', offset: 0.3 }),
          style({ transform: 'rotate(45deg)', offset: 0.6 }),
          style({ transform: 'rotate(0deg)', offset: 1.0 })
        ]))
      ])
    ]),
    trigger('accordionContent', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden',
        opacity: 1
      })),
      transition('collapsed => expanded', [
        animate('300ms ease-in-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
})

export class AboutMeComponent {
  workExperience: Experience[] = [
    {
      title: 'Frontend Developer',
      company: 'NTT Data',
      description: [
        'Delivered 10+ reusable widgets for the design system of a major banking company, enhancing development efficiency for internal and external teams.',
        'Managed and triggered Jenkins pipelines to deploy web applications and modules across all environments, ensuring smooth and reliable releases.',
      ],
      expanded: false,
      startDate: '2024',
      endDate: 'present',
      tags: [
        'TypeScript',
        'JavaScript',
        'Angular',
        'RxJS',
        'HTML',
        'CSS',
        'SCSS',
        'React',
        'Jenkins',
        'Git',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Lascaux srl',
      description: [
        'Contributed to the development of complex applications, keeping the code modular through efficient state management, resulting in a reduced development time for new features by 20%, speeding up project delivery.',
        'Performed targeted refactoring, achieving a -30% reduction in loading times and a -20% decrease in page abandonment rates, significantly improving application performance.',
        'Implemented WCAG accessibility standards across applications, expanding usability to a 18% larger audience. This initiative reduced potential legal risks, helping the company avoid up to 5% in potential non-compliance fines.',
        'Aided in developing a new labor timesheet platform that streamlined internal processes, reducing operation times by 25% and saving the company approximately 50-80 hours per month, reducing operational costs by 10%'
      ],
      expanded: false,
      startDate: '2022',
      endDate: '2024',
      tags: [
        'TypeScript',
        'JavaScript',
        'Angular',
        'RxJS',
        'NgRx',
        'Redux',
        'HTML',
        'CSS',
        'SCSS',
        'React',
        'Git',
      ],
    },
  ];

  education: Education[] = [
    {
      degree: 'Start2impact - Frontend student ',
      details:
        'Completed 500+ hours frontend training program, applying my learning through real-world projects and receiving in-depth feedback from experienced mentors',
      expanded: false,
      startYear: '2021',
      endYear: '2022',
    },
  ];

  workExperienceSkills: Skill[] = [
    { name: 'TypeScript', icon: 'assets/images/typescript-icon.svg' },
    { name: 'JavaScript', icon: 'assets/images/javascript.svg' },
    { name: 'Bash', icon: 'assets/images/bash-icon.svg' },
    { name: 'Angular', icon: 'assets/images/angular-icon.svg' },
    { name: 'Redux', icon: 'assets/images/redux.svg' },
    { name: 'Ngrx', icon: 'assets/images/ngrx.svg' },
    { name: 'RxJS', icon: 'assets/images/reactivex.svg' },
    { name: 'React', icon: 'assets/images/react.svg' },
    { name: 'Git', icon: 'assets/images/git-icon.svg' },
    { name: 'HTML', icon: 'assets/images/html.svg' },
    { name: 'CSS', icon: 'assets/images/css-3.svg' },
    { name: 'Sass', icon: 'assets/images/sass.svg' },
    { name: 'Tailwind', icon: 'assets/images/tailwindcss-icon.svg' },
    { name: 'Bootstrap', icon: 'assets/images/bootstrap.svg' },
  ];

  generalKnowledge: Skill[] = [
    { name: 'Node.js', icon: 'assets/images/nodejs-icon.svg' },
    { name: 'Express', icon: 'assets/images/nodejs-icon-alt.svg' },
    { name: 'MongoDB', icon: 'assets/images/mongodb-icon.svg' },
    { name: 'PostgreSQL', icon: 'assets/images/postgresql.svg' },
    { name: 'Docker', icon: 'assets/images/docker-icon.svg' },
    { name: 'Linux', icon: 'assets/images/linux-tux.svg' },
    { name: 'Figma', icon: 'assets/images/figma.svg' },
  ];

  toggleAccordion(item: Experience | Education): void {
    item.expanded = !item.expanded;
  }
}
