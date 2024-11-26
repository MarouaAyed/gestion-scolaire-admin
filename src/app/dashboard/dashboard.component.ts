import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public totalUsersData: any;
  public studentsPerGroupData: any;
  public studentsPerYearData: any;

  public chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    // Example: Type of the chart (can be 'bar', 'line', 'doughnut', etc.)
    type: 'doughnut',  // Example chart type for totalUsersData
  };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadStudentsPerGroup();
    this.loadStudentsPerYear();
  }

  loadStatistics() {
    this.statisticsService.getStatistics().subscribe((data) => {
      console.log('loadStatistics ', data);
      this.totalUsersData = {
        labels: ['Total Users', 'Male Users', 'Female Users'],
        datasets: [
          {
            data: [data.totalUsers, data.maleUsers, data.femaleUsers],
            backgroundColor: ['#007bff', '#28a745', '#ff69b4'],  // Blue for Total Users, Green for Male, Pink for Female
          },
        ],
      };
    });
  }
  

  loadStudentsPerGroup() {
    this.statisticsService.getStudentsPerGroup().subscribe((data) => {
      this.studentsPerGroupData = {
        labels: data.map((group: any) => group.group),
        datasets: [
          {
            data: data.map((group: any) => group.student_count),
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
          },
        ],
      };
    });
  }

  loadStudentsPerYear() {
    this.statisticsService.getStudentsPerYear().subscribe((data) => {
      this.studentsPerYearData = {
        labels: data.map((item: any) => item.year),
        datasets: [
          {
            label: 'Students',
            data: data.map((item: any) => item.student_count),
            backgroundColor: '#007bff',
          },
        ],
      };
    });
  }
}
