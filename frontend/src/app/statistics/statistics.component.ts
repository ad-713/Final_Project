import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;  // Changed to uppercase
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      spacingTop: 40,
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Movie Genres Distribution',
      margin: 20
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          distance: 20
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Genres',
      data: []
    }]
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovieData();
  }

  private loadMovieData(): void {
    this.movieService.getMovies().subscribe({
      next: (movies: Movie[]) => {
        const genreCount = this.countGenres(movies);
        this.updateChartData(genreCount);
      },
      error: (error) => console.error('Error fetching movies:', error)
    });
  }

  private countGenres(movies: Movie[]): Record<string, number> {
    return movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private updateChartData(genreCount: Record<string, number>): void {
    const seriesData = Object.entries(genreCount).map(([name, y]) => ({ name, y }));

    this.chartOptions.series = [{
      type: 'pie',
      name: 'Genres',
      data: seriesData
    }];

    this.updateFlag = true;  // Trigger chart update
  }
}
