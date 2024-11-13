import { Component, Input } from '@angular/core';
import { SeanceService } from '../services/seance/seance.service';
import { Seance } from '../models/seance/seance.model';

@Component({
  selector: 'app-timetable-group',
  standalone: true,
  imports: [],
  templateUrl: './timetable-group.component.html',
  styleUrl: './timetable-group.component.css'
})
export class TimetableGroupComponent {
  @Input() groupId: number | undefined; // Input for group ID
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timeSlots: string[] = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'];
  timetable: { [key: string]: { [key: string]: Seance | null } } = {};

  constructor(private seanceService: SeanceService) {}

  ngOnInit(): void {
    if (this.groupId) {
      this.loadTimetableByGroup(this.groupId);
    }
  }

  loadTimetableByGroup(groupId: number): void {
    this.seanceService.getSeancesByGroup(groupId).subscribe((seances: Seance[]) => {
      this.initializeTimetable();

      seances.forEach(seance => {
        const day = seance.day;
        const timeSlot = `${seance.trancheHoraire.start_date} - ${seance.trancheHoraire.end}`;
        this.timetable[day][timeSlot] = seance;
      });
    });
  }

  initializeTimetable(): void {
    this.daysOfWeek.forEach(day => {
      this.timetable[day] = {};
      this.timeSlots.forEach(slot => {
        this.timetable[day][slot] = null;
      });
    });
  }
}
