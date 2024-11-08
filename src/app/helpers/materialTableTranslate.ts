import { MatPaginatorIntl } from '@angular/material/paginator';

export function MaterialPaginatorTranslated() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'itens por página';
  customPaginatorIntl.firstPageLabel = 'primeira página';
  customPaginatorIntl.nextPageLabel = 'próxima';
  customPaginatorIntl.previousPageLabel = 'anterior';

  return customPaginatorIntl;
}
