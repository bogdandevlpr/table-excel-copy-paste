import { Component } from '@angular/core';

interface TableCell<T> {
  name?: string;
  value: T;
  type: 'text' | 'select' | 'date';
  options?: string[];
}

const dataModel: TableCell<any>[][] = [
  [
    { name: 'column1', type: 'text', value: '' },
    {
      name: 'column2',
      type: 'select',
      value: '',
      options: ['option1', 'option2', 'option3'],
    },
    { name: 'column3', type: 'date', value: '' },
    { name: 'column4', type: 'text', value: '' },
    { name: 'column5', type: 'text', value: '' },
    { name: 'column6', type: 'date', value: '' },
  ],
  [
    { name: 'column1', type: 'text', value: '' },
    {
      name: 'column2',
      type: 'select',
      value: '',
      options: ['option1', 'option2', 'option3'],
    },
    { name: 'column3', type: 'date', value: '' },
    { name: 'column4', type: 'text', value: '' },
    { name: 'column5', type: 'text', value: '' },
    { name: 'column6', type: 'date', value: '' },
  ],
  [
    { name: 'column1', type: 'text', value: '' },
    {
      name: 'column2',
      type: 'select',
      value: '',
      options: ['option1', 'option2', 'option3'],
    },
    { name: 'column3', type: 'date', value: '' },
    { name: 'column4', type: 'text', value: '' },
    { name: 'column5', type: 'text', value: '' },
    { name: 'column6', type: 'date', value: '' },
  ],
  [
    { name: 'column1', type: 'text', value: '' },
    {
      name: 'column2',
      type: 'select',
      value: '',
      options: ['option1', 'option2', 'option3'],
    },
    { name: 'column3', type: 'date', value: '' },
    { name: 'column4', type: 'text', value: '' },
    { name: 'column5', type: 'text', value: '' },
    { name: 'column6', type: 'date', value: '' },
  ],
  [
    { name: 'column1', type: 'text', value: '' },
    {
      name: 'column2',
      type: 'select',
      value: '',
      options: ['option1', 'option2', 'option3'],
    },
    { name: 'column3', type: 'date', value: '' },
    { name: 'column4', type: 'text', value: '' },
    { name: 'column5', type: 'text', value: '' },
    { name: 'column6', type: 'date', value: '' },
  ],
];

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent {
  table: TableCell<any>[][] = dataModel;

  onAddRow() {
    const newRow: TableCell<any>[] = [
      { name: 'column1', type: 'text', value: '' },
      {
        name: 'column2',
        type: 'select',
        value: '',
        options: ['option1', 'option2', 'option3'],
      },
      { name: 'column3', type: 'date', value: '' },
      { name: 'column4', type: 'text', value: '' },
      { name: 'column5', type: 'text', value: '' },
      { name: 'column6', type: 'date', value: '' },
    ];
    this.table = [...this.table, [...newRow]];
  }

  onRemoveRow(i: number) {
    if (i > -1) {
      this.table.splice(i, 1);
    }
  }

  onClear() {
    this.table = this.table.map((row: TableCell<any>[]) => {
      return row.map((cell: TableCell<any>) => ({ ...cell, value: '' }));
    });
  }

  onReset() {
    this.table = dataModel.map((row: TableCell<any>[]) => {
      return row.map((cell: TableCell<any>) => ({ ...cell, value: '' }));
    });
  }

  onPaste(event: ClipboardEvent, rowIndex: number, colIndex: number): void {
    event.preventDefault();

    const clipboardData = event.clipboardData?.getData('text') || '';
    const rows = clipboardData.trim().split('\n');

    let currentRowIndex = rowIndex;

    rows.forEach((row) => {
      const columns = row.split('\t');
      let currentColIndex = colIndex;

      columns.forEach((column) => {
        const cell = this.getCell(currentRowIndex, currentColIndex);
        if (cell) {
          if (cell.type === 'text') {
            cell.value = column?.trim();
          } else if (cell.type === 'select') {
            cell.value = column?.trim();
          } else if (cell.type === 'date') {
            cell.value = new Date(column?.trim());
          }
        }
        currentColIndex++;
      });

      currentRowIndex++;
    });
  }

  private getCell(rowIndex: number, colIndex: number): any {
    if (
      rowIndex >= this.table.length ||
      colIndex >= this.table[rowIndex].length
    ) {
      return null;
    }
    return this.table[rowIndex][colIndex];
  }
}
