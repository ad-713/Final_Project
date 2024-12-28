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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Movie Genres Distribution'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Genres',
      type: 'pie',
      data: []
    }] as any
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovieData();
  }

  loadMovieData(): void {
    this.movieService.getMovies().subscribe({
      next: (movies: Movie[]) => {
        this.prepareChartData(movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  prepareChartData(movies: Movie[]): void {
    // Count genres
    const genreCount = movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to series data
    const seriesData = Object.entries(genreCount).map(([name, y]) => ({
      name,
      y
    }));

    // Update chart options
    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        type: 'pie',
        name: 'Genres',
        data: seriesData
      }] as any
    };
  }
}
