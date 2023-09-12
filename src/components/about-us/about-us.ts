import './about-us.scss';
import { TMember } from '@lib/types/about-us';
import { team } from '@lib/constants/team';
import logo from './../../assets/images/logo-rsschool.png';
import githubIcon from './../../assets/images/github.png';

export class AboutUs {
  public createAboutPage(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    const rsLogo: string = `
      <a class="logo-link" href="https://rs.school/" target="_blank">
        <img class="logo-img" src='${logo}' alt="rs school" />
      </a>
    `;
    wrapper.insertAdjacentHTML('afterbegin', rsLogo);
    wrapper.append(this.createTeamSection());
    return wrapper;
  }

  private createTeamSection(): HTMLDivElement {
    const teamWrapper: HTMLDivElement = document.createElement('div');
    const teamList: HTMLUListElement = document.createElement('ul');
    teamList.classList.add('team-list');

    team.forEach((member: TMember): void => {
      teamList.insertAdjacentHTML('beforeend', this.createDeveloper(member));
    });

    teamWrapper.append(teamList);
    return teamWrapper;
  }

  private createDeveloper({ name, location, github, position, description, photo, quote }: TMember): string {
    return `
    <li class="team-list-item">
      <img class="item-photo" src='${photo}' alt="${name}" />
      <div class="item-desc-block">
        <h3 class="item-title">${name}, <span class="item-position">${position}</span><a class="item-github-link" target="_blank" href="${github}">
        <img class="item-github-img" src="${githubIcon}" alt="github" />
      </a></h3>
      <p class="item-location">${location}</p>
      <img class="item-quote" src="${quote}" alt="quote" />
      <p class="item-desc">${description}</p>
      </div>
    </li>
    `;
  }
}
