import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { SimpleChanges } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginatorComponent], // Since it's a standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize totalPages and displayedPages correctly on init', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 1;

    component.ngOnInit();

    expect(component.totalPages).toBe(10);
    expect(component.displayedPages).toEqual([1, 2]);
  });

  it('should update pagination when inputs change', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 2;

    const changes: SimpleChanges = {
      totalItems: { currentValue: 50, previousValue: 0, firstChange: true, isFirstChange: () => true },
      itemsPerPage: { currentValue: 10, previousValue: 0, firstChange: true, isFirstChange: () => true },
    };

    component.ngOnChanges(changes);

    expect(component.totalPages).toBe(5);
    expect(component.displayedPages).toEqual([1, 2, 3]);
  });

  it('should emit pageSizeChange and reset to first page on page size change', () => {
    spyOn(component.pageSizeChange, 'emit');
    spyOn(component.pageChange, 'emit');

    const mockEvent = { target: { value: '20' } } as unknown as Event;
    component.totalItems = 100;

    component.onPageSizeChange(mockEvent);

    expect(component.itemsPerPage).toBe(20);
    expect(component.totalPages).toBe(5);
    expect(component.currentPage).toBe(1);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(20);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should emit pageChange on page change', () => {
    spyOn(component.pageChange, 'emit');

    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.onPageChange(3);

    expect(component.currentPage).toBe(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should calculate isNextDisabled correctly', () => {
    // Set up test data
    component.totalItems = 50; // Total 50 items
    component.itemsPerPage = 10; // 10 items per page
    component.currentPage = 5; // Last page

    // Trigger pagination logic
    component.updatePagination();

    // Expect the "Next" button to be disabled on the last page
    expect(component.isNextDisabled).toBeTrue();

    // Change to a page that is not the last page
    component.currentPage = 4;
    component.updatePagination();

    // Expect the "Next" button to be enabled
    expect(component.isNextDisabled).toBeFalse();
  });
});