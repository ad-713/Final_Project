import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import {
  ColDef,
  GridReadyEvent,
  GridOptions
} from 'ag-grid-community';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  isBrowser: boolean;
  rowData: Movie[] = [];
  isLoading = false;
  error: string | null = null;

  // Grid configuration
  public gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      minWidth: 100,
      filterParams: {
        buttons: ['reset', 'apply']
      }
    },
    theme: 'legacy'
  };

  columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      filter: 'agNumberColumnFilter',
      width: 100
    },
    {
      headerName: "Title",
      field: "title",
      flex: 1
    },
    {
      headerName: "Director",
      field: "director",
      flex: 1
    },
    {
      headerName: "Release Date",
      field: "releaseDate",
      width: 150
    },
    {
      headerName: "Genre",
      field: "genre",
      width: 150
    }
  ];

  constructor(
    private movieService: MovieService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadMovies();
    }
  }

  loadMovies() {
    this.isLoading = true;
    this.error = null;

    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.rowData = movies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.error = 'Failed to load movies. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    if (this.isBrowser) {
      params.api.sizeColumnsToFit();
    }
  }

  refreshData() {
    if (this.isBrowser) {
      this.loadMovies();
    }
  }
}
