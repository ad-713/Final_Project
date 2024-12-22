import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Highcharts from 'highcharts';
// Accessibility module is dynamically loaded only in the browser
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  // Hardcoded movie data
  private movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', releaseDate: '2010-07-16', genre: 'Sci-Fi' },
    { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont', releaseDate: '1994-09-23', genre: 'Drama' },
    { id: 3, title: 'The Godfather', director: 'Francis Ford Coppola', releaseDate: '1972-03-24', genre: 'Crime' },
    { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino', releaseDate: '1994-10-14', genre: 'Crime' },
    { id: 5, title: 'The Dark Knight', director: 'Christopher Nolan', releaseDate: '2008-07-18', genre: 'Action' },
    { id: 6, title: "Schindler's List", director: 'Steven Spielberg', releaseDate: '1993-12-15', genre: 'Biography' },
    { id: 7, title: 'Forrest Gump', director: 'Robert Zemeckis', releaseDate: '1994-07-06', genre: 'Drama' },
    { id: 8, title: 'The Matrix', director: 'Lana Wachowski', releaseDate: '1999-03-31', genre: 'Sci-Fi' },
    { id: 9, title: 'Goodfellas', director: 'Martin Scorsese', releaseDate: '1990-09-19', genre: 'Crime' },
    { id: 10, title: 'The Silence of the Lambs', director: 'Jonathan Demme', releaseDate: '1991-02-14', genre: 'Thriller' },
    { id: 11, title: 'Saving Private Ryan', director: 'Steven Spielberg', releaseDate: '1998-07-24', genre: 'War' },
    { id: 12, title: 'The Lord of the Rings: The Fellowship of the Ring', director: 'Peter Jackson', releaseDate: '2001-12-19', genre: 'Fantasy' },
    { id: 13, title: 'Fight Club', director: 'David Fincher', releaseDate: '1999-10-15', genre: 'Drama' },
    { id: 14, title: 'The Green Mile', director: 'Frank Darabont', releaseDate: '1999-12-10', genre: 'Drama' },
    { id: 15, title: 'Gladiator', director: 'Ridley Scott', releaseDate: '2000-05-05', genre: 'Action' },
    { id: 16, title: 'The Departed', director: 'Martin Scorsese', releaseDate: '2006-10-06', genre: 'Crime' },
    { id: 17, title: 'The Usual Suspects', director: 'Bryan Singer', releaseDate: '1995-08-16', genre: 'Crime' },
    { id: 18, title: 'The Lion King', director: 'Roger Allers', releaseDate: '1994-06-24', genre: 'Animation' },
    { id: 19, title: 'Casablanca', director: 'Michael Curtiz', releaseDate: '1942-11-26', genre: 'Romance' },
    { id: 20, title: 'The Shining', director: 'Stanley Kubrick', releaseDate: '1980-05-23', genre: 'Horror' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.prepareChartData(this.movies);
    }
  }

  prepareChartData(movies: any[]): void {
    // Count occurrences of each genre
    const genreCount = movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Prepare series data for the chart
    const seriesData = Object.keys(genreCount).map(key => ({
      name: key,
      y: genreCount[key]
    }));

    // Set up chart options
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Movie Genres Distribution'
      },
      accessibility: {
        enabled: true // Enable accessibility features
      },
      series: [{
        name: 'Genres',
        type: 'pie',
        data: seriesData,
        showInLegend: true,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}'
        }
      }]
    };
  }
}
