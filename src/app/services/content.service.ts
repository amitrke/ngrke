import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';

@Injectable()
export class ContentService {

  private dataStore: ContentEntity[];

  constructor() {
    this.dataStore = [ new ContentEntity(
      'iitr',
      'IIT Roorkee',
      'assets/img/home/iitr.jpg',
      'The famed IIT (Indian Institute of Technology) has its genesis in Roorkee College. Constituted in 1847, its purpose was to train the manpower for the construction of Ganga Canal. Today it educates hundreds of students and prepares them for global challenges.',
      'The Indian Institute of Technology Roorkee (IIT Roorkee, formerly the University of Roorkee, is a public university located in Roorkee, Uttarakhand, India. Established in 1847, it was given university status in 1949 and in 2001 was converted into an IIT, thus becoming the seventh Indian Institute of Technology to be declared.<br/>IIT Roorkee is not a university but a replacement of the University of Roorkee. The name University of Roorkee appears in all the official documents till 2001, when it was closed. IIT Roorkee has 18 academic departments covering engineering, applied sciences, humanities & social sciences and management programs. It lays a claim to being the technical institutions with the largest number of academic units in India.<br/>IIT Roorkee offers academic programmes in Engineering, Technology, Applied Sciences, and Management. It runs eleven undergraduate (UG), five integrated dual degree, three integrated M.Tech., three integrated M.Sc., sixty one postgraduate (PG) and several doctoral programmes.<br/>The institute admits students to B.Tech., B.Arch. and integrated M.Tech/M.Sc courses through the IIT-Joint Entrance Examination (JEE) conducted at centers all over India. Before being converted into an IIT, the university selected students through the Roorkee Entrance Exam (REE) conducted on an All-India level. The selectivity of REE was close to 2%. After IIT-JEE, it was considered to be the second toughest engineering entrance examination in India.[citation needed] Admission to PG programmes in engineering and architecture is on the basis of GATE score and/or a written test and interview. For PG programmes in fundamental sciences admission is based on the Joint Admission Test (JAM).<br/>Along with the engineering courses, the institute offers a two-year residential MBA program for which the admissions, starting from 2011, will be done on the basis of Common Admission Test, thus replacing Joint Management Entrance Test (JMET) previously conducted by IITs.[8] The institute also offers a interdisciplinary program in computer applications leading to a degree in Master of computer applications (MCA). The MCA program is a three-year course and admission for the course is through JAM.<br/>According to statistics published by institute in 2007-08 4137 students were enrolled in the institute across all programs. The student-to-academic-staff ratio was 2.6:1 and that of UG/PG students was <br/> As in other IITs, the institute follows a credit system for evaluating academic performance. The grade point average (GPA) is on a scale of 0 to 10. Courses are allotted number of credits according to their importance. Each academic year is divided into two semesters and teaching programmes are organized around the credit system. Teaching includes lectures, tutorials, practicals, projects, seminars, dissertations, and field and industrial training.'
    )
    ];
  }

  /**
   * get
   */
  public get(id: String): ContentEntity {
    let searchResult: ContentEntity;
    this.dataStore.forEach(element => {
      if (element.id === id) {
        searchResult = element;
      }
    });
    return searchResult;
  }
}
